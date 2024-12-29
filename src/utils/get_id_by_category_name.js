import {fetchAllCategory} from "../api/category_apis.js";

export const get_id_by_category_name = async (category_name) => {
	fetchAllCategory().then((categoryData) => {
		categoryData.forEach((category) => {
			if (category.name === category_name) {
				console.log(category.id)
				return category.id;
			}
		})
	})
}