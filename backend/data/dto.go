package data

import (
	"log"
)

type ProductsByCategoryDTO struct {
	Category string     `json:"category"`
	Products []*Product `json:"products"`
}

type ProductsResponseDTO struct {
	Products []ProductsByCategoryDTO `json:"products"`
}

func (ProductsResponseDTO) ToDTO(d Data) (*ProductsResponseDTO, error) {
	categories, err := d.Category.GetAll(d.Db)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	dto := &ProductsResponseDTO{}
	for _, c := range categories {
		products, _ := d.Product.GetAllByCategoryId(d.Db, c.Id)
		prodsCat := ProductsByCategoryDTO{
			Category: c.Name,
			Products: products,
		}

		dto.Products = append(dto.Products, prodsCat)
	}
	return dto, nil
}
