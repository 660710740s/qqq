package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"catfoodstore_backend/internal/repository"
	"catfoodstore_backend/internal/service"
)

type ProductHandler struct {
	service *service.ProductService
}

func NewProductHandler(s *service.ProductService) *ProductHandler {
	return &ProductHandler{service: s}
}

func (h *ProductHandler) GetAll(c *gin.Context) {
	res, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "โหลดสินค้าไม่สำเร็จ"})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *ProductHandler) GetByID(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	item, err := h.service.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบสินค้า"})
		return
	}

	c.JSON(http.StatusOK, item)
}

func (h *ProductHandler) Create(c *gin.Context) {
	var p repository.Product

	if err := c.BindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "รูปแบบข้อมูลไม่ถูกต้อง"})
		return
	}

	if err := h.service.Create(p); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "เพิ่มสินค้าไม่สำเร็จ"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "เพิ่มสินค้าแล้ว"})
}

func (h *ProductHandler) Update(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	var p repository.Product
	if err := c.BindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ข้อมูลไม่ถูกต้อง"})
		return
	}

	p.ID = id

	if err := h.service.Update(p); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "อัปเดตไม่สำเร็จ"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "แก้ไขสินค้าเรียบร้อย"})
}

func (h *ProductHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	if err := h.service.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ลบสินค้าไม่สำเร็จ"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ลบสินค้าแล้ว"})
}
