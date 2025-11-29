package service

import (
	"errors"
	"catfoodstore_backend/internal/repository"
)

type UserService struct {
	repo repository.UserRepository
}

func NewUserService(r repository.UserRepository) *UserService {
	return &UserService{repo: r}
}

func (s *UserService) Login(email, password string) (*repository.User, error) {
	u, err := s.repo.FindByEmail(email)
	if err != nil {
		return nil, err
	}

	// plain password compare
	if u.Password != password {
		return nil, errors.New("รหัสผ่านไม่ถูกต้อง")
	}

	return u, nil
}
