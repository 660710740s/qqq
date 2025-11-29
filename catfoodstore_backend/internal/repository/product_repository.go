package repository

import (
	"database/sql"
	"errors"
	"strings"
)

type Product struct {
	ID          int64
	Name        string
	Description string
	Price       float64
	Weight      string
	AgeGroup    string
	BreedType   []string
	Category    string
	ImageURL    string
}

type ProductRepository struct {
	db *sql.DB
}

func NewProductRepository(db *sql.DB) ProductRepository {
	return ProductRepository{db: db}
}

func (r ProductRepository) GetAll() ([]Product, error) {
	rows, err := r.db.Query(`
		SELECT id, name, description, price, weight, age_group, breed_type, category, image_url
		FROM products
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []Product
	for rows.Next() {
		var p Product
		var breedArr string

		err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.Price, &p.Weight,
			&p.AgeGroup, &breedArr, &p.Category, &p.ImageURL)
		if err != nil {
			return nil, err
		}

		p.BreedType = strings.Split(strings.Trim(breedArr, "{}"), ",")

		items = append(items, p)
	}
	return items, nil
}

func (r ProductRepository) GetByID(id int64) (*Product, error) {
	row := r.db.QueryRow(`
		SELECT id, name, description, price, weight, age_group, breed_type, category, image_url 
		FROM products WHERE id=$1
	`, id)

	var p Product
	var breedArr string

	err := row.Scan(&p.ID, &p.Name, &p.Description, &p.Price, &p.Weight,
		&p.AgeGroup, &breedArr, &p.Category, &p.ImageURL)

	if err != nil {
		return nil, errors.New("ไม่พบสินค้า")
	}

	p.BreedType = strings.Split(strings.Trim(breedArr, "{}"), ",")

	return &p, nil
}

func (r ProductRepository) Create(p Product) error {
	_, err := r.db.Exec(`
		INSERT INTO products (name, description, price, weight, age_group, breed_type, category, image_url)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
	`, p.Name, p.Description, p.Price, p.Weight, p.AgeGroup,
		"{"+strings.Join(p.BreedType, ",")+"}", p.Category, p.ImageURL)

	return err
}

func (r ProductRepository) Update(p Product) error {
	_, err := r.db.Exec(`
		UPDATE products SET 
			name=$1, description=$2, price=$3, weight=$4,
			age_group=$5, breed_type=$6, category=$7, image_url=$8
		WHERE id=$9
	`, p.Name, p.Description, p.Price, p.Weight, p.AgeGroup,
		"{"+strings.Join(p.BreedType, ",")+"}", p.Category, p.ImageURL, p.ID)

	return err
}

func (r ProductRepository) Delete(id int64) error {
	_, err := r.db.Exec(`DELETE FROM products WHERE id=$1`, id)
	return err
}
