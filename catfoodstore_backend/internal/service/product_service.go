package service

import (
	"catfoodstore_backend/internal/repository"
)

type ProductService struct {
	repo repository.ProductRepository
}

func NewProductService(r repository.ProductRepository) *ProductService {
	return &ProductService{repo: r}
}

func (s *ProductService) GetAll() ([]repository.Product, error) {
	return s.repo.GetAll()
}

func (s *ProductService) GetByID(id int64) (*repository.Product, error) {
	return s.repo.GetByID(id)
}

func (s *ProductService) Create(p repository.Product) error {
	return s.repo.Create(p)
}

func (s *ProductService) Update(p repository.Product) error {
	return s.repo.Update(p)
}

func (s *ProductService) Delete(id int64) error {
	return s.repo.Delete(id)
}
