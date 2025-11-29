package repository

import (
	"database/sql"
	"errors"
)

type User struct {
	ID       int
	Email    string
	Password string
	Role     string
}

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return UserRepository{db: db}
}

func (r UserRepository) FindByEmail(email string) (*User, error) {
	row := r.db.QueryRow(`
        SELECT id, email, password, role
        FROM users
        WHERE email = $1
    `, email)

	u := &User{}
	err := row.Scan(&u.ID, &u.Email, &u.Password, &u.Role)
	if err != nil {
		return nil, errors.New("ไม่พบผู้ใช้")
	}

	return u, nil
}
