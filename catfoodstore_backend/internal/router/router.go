package router

import (
    "database/sql"
    "net/http"
    "strings"

    "catfoodstore_backend/internal/handler"
    "catfoodstore_backend/internal/middleware"
    "catfoodstore_backend/internal/repository"
    "catfoodstore_backend/internal/service"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func New(db *sql.DB) *gin.Engine {
    r := gin.New()

    // ⭐⭐⭐ CORS สำหรับ Codespaces + Local ⭐⭐⭐
    r.Use(cors.New(cors.Config{
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        AllowCredentials: true,

        // ✔ อนุญาตเฉพาะ domain ที่จำเป็น
        AllowOriginFunc: func(origin string) bool {

            // 🔹 GitHub Codespaces (ทั้ง Frontend 3000 & Backend 8080)
            // ตัว URL จะเป็นแบบ:
            // https://xxxx-3000.app.github.dev
            // https://xxxx-8080.app.github.dev
            if strings.Contains(origin, "app.github.dev") {
                return true
            }

            // 🔹 Localhost (รัน React บนเครื่อง)
            if strings.Contains(origin, "localhost") ||
                strings.Contains(origin, "127.0.0.1") {
                return true
            }

            return false
        },
    }))

    // Logging + Recover
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
    // USER MODULE
    // -----------------------------
    userRepo := repository.NewUserRepository(db)
    userService := service.NewUserService(userRepo)
    userHandler := handler.NewUserHandler(userService)
    userHandler.RegisterRoutes(r)

    // -----------------------------
    // ADMIN ROUTES (Protected)
    // -----------------------------
    admin := r.Group("/api/admin")
    admin.Use(middleware.AuthMiddleware, middleware.AdminOnly)
    admin.POST("/products", productHandler.Create)
    admin.PUT("/products/:id", productHandler.Update)
    admin.DELETE("/products/:id", productHandler.Delete)

    return r
}
