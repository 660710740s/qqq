package router

import (
	"database/sql"

	"github.com/gin-gonic/gin"

	"catfoodstore_backend/internal/repository"
	"catfoodstore_backend/internal/service"
	"catfoodstore_backend/internal/handler"
)

func New(db *sql.DB) *gin.Engine {

	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// REPO
	productRepo := repository.NewProductRepository(db)
	userRepo := repository.NewUserRepository(db)

	// SERVICE
	productSrv := service.NewProductService(productRepo)
	userSrv := service.NewUserService(userRepo)

	// HANDLER
	productHandler := handler.NewProductHandler(productSrv)
	userHandler := handler.NewUserHandler(userSrv)

	// ROUTES
	api := r.Group("/api")
	{
		api.GET("/products", productHandler.GetAll)
		api.GET("/products/:id", productHandler.GetByID)

		api.POST("/login", userHandler.Login)

		admin := api.Group("/admin")
		{
			admin.POST("/products", productHandler.Create)
			admin.PUT("/products/:id", productHandler.Update)
			admin.DELETE("/products/:id", productHandler.Delete)
		}
	}

	return r
}
