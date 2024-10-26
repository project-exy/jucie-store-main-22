package data

type ProductsByCategoryDTO struct {
	Category string     `json:"category"`
	Products []*Product `json:"products"`
}

type ProductsResponseDTO struct {
	Products []ProductsByCategoryDTO `json:"products"`
}

func (ProductsByCategoryDTO) ToDTO(d Data) {

}
