package router

import (
    "database/sql"
    "net/http"
    "strings"

    "catfoodstore_backend/internal/handler"
    "catfoodstore_backend/internal/middleware"
    "catfoodstore_backend/internal/repository"
    "catfoodstore_backend/internal/service"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func New(db *sql.DB) *gin.Engine {
    r := gin.New()

    // ⭐⭐⭐ CORS สำหรับ Codespaces + Local DEV ⭐⭐⭐
    r.Use(cors.New(cors.Config{
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        AllowCredentials: true,
        AllowOriginFunc: func(origin string) bool {

            // อนุญาต origin จาก GitHub Codespaces เช่น:
            // https://super-duper-umbrella-xxxx-3000.app.github.dev
            if strings.Contains(origin, "app.github.dev") {
                return true
            }

            // อนุญาต local frontend
            if strings.Contains(origin, "localhost") || strings.Contains(origin, "127.0.0.1") {
                return true
            }

            return false
        },
    }))

    // Middlewares
    r.Use(middleware.Logger())
    r.Use(middleware.Recover())

    // -----------------------------
    // HEALTH CHECK
    // -----------------------------
    r.GET("/health", func(c *gin.Context) {
        if err := db.Ping(); err != nil {
            c.JSON(http.StatusServiceUnavailable, gin.H{"status": "unhealthy"})
            return
        }
        c.JSON(200, gin.H{"status": "ok"})
    })

    // Swagger docs
    r.GET("/docs/swagger.yaml", func(c *gin.Context) {
        c.File("./docs/swagger.yaml")
    })

    // -----------------------------
    // PRODUCT MODULE
    // -----------------------------
    productRepo := repository.NewProductRepository(db)
    productService := service.NewProductService(productRepo)
    productHandler := handler.NewProductHandler(productService)
    productHandler.RegisterRoutes(r)

    // -----------------------------
    // USER MODULE (LOGIN)
    // -----------------------------
    userRepo := repository.NewUserRepository(db)
    userService := service.NewUserService(userRepo)
    userHandler := handler.NewUserHandler(userService)
    userHandler.RegisterRoutes(r)

    // -----------------------------
    // ADMIN MODULE (PROTECTED)
    // -----------------------------
    admin := r.Group("/api/admin")
    admin.Use(middleware.AuthMiddleware, middleware.AdminOnly)
    admin.POST("/products", productHandler.Create)
    admin.PUT("/products/:id", productHandler.Update)
    admin.DELETE("/products/:id", productHandler.Delete)

    return r
}
