const mongoose = require('mongoose');

// eslint-disable-next-line max-len
/* This meal schemal will have an object inside of it whic is in the format of this data object
   meals: [ [Object], [Object], [Object] ],
    nutrients: {
      calories: 1999.45,
      protein: 102.34,
      fat: 118.72,
      carbohydrates: 128.02
    }
    
    meals is an array of objects which will contain data format like this
       {
            "id": 655219,
            "title": "Peanut Butter And Chocolate Oatmeal",
            "imageType": "jpg",
            "readyInMinutes": 45,
            "servings": 1,
            "sourceUrl": "https://spoonacular.com/recipes/peanut-butter-and-chocolate-oatmeal-655219"
        }

    there are 3 meals per day breakfast Lunch dinner in order 0,1,2
    */
const mealSchema = new mongoose.Schema({
  _id: { type: String, required: [true, 'User id is required'] },
  week: {
    monday: { type: Object },
    tuesday: { type: Object },
    wednesday: { type: Object },
    thursday: { type: Object },
    friday: { type: Object },
    saturday: { type: Object },
    sunday: { type: Object },
  },
});

module.exports = mongoose.model('meals', mealSchema);
