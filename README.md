# qs-api-express
## See a list of the endpoints and their returns below:

### Food endpoints

> __GET /api/foods__
> 
> Returns all foods in the database.

```json
[
    {
        "id": 1,
        "name": "Teriyaki Chicken Donburi",
        "calories": 523
    },
    {
        "id": 2,
        "name": "Tuna Sashimi",
        "calories": 195
    },
    {
        "id": 3,
        "name": "Vegetable Soup",
        "calories": 188
    }
]
```
> __GET /api/foods/:id__
>
> Returns a single food
```json
{
    "id": 35,
    "name": "Mushroom Risotto",
    "calories": 740
}
```
> __POST /api/foods__
> 
> add a new food to the database with json paramaters formatted like this (name and calories are required fields):
>
> `{ "food": { "name": "Flamin' Hot Cheetos", "calories": "450"} }`
>
> Returns a json object with the new foods data

```json
{
    "id": 61,
    "name": "Flamin' Hot Cheetos",
    "calories": 450
}
```
> __PATCH /api/foods/:id__
>
> update a food in the database with an existing food id and json parameters formatted like this (name and calories are required fields):
>
> `{ "food": { "name": "XXXTra Flamin' Hot Cheetos", "calories": "450"} }`
>
> Returns a json object with the updated foods data

```json
{
    "id": 61,
    "name": "XXXTra Flamin' Hot Cheetos",
    "calories": 450
}
```
> __DELETE /api/foods/:id__
>
> will delete the food at the id provided
>
> Returns `status: 204`

### Meal endpoints

> __GET /api/meals__
>
> Returns all the meals in the database along with their associated foods

```json
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 12,
                "name": "Pork Belly Buns",
                "calories": 706
            },
            {
                "id": 19,
                "name": "Chicken Milanese",
                "calories": 167
            },
            {
                "id": 23,
                "name": "Caesar Salad",
                "calories": 797
            }
        ]
    },
    {
        "id": 2,
        "name": "Lunch",
        "foods": [
            {
                "id": 8,
                "name": "Risotto with Seafood",
                "calories": 769
            },
            {
                "id": 23,
                "name": "Caesar Salad",
                "calories": 797
            },
            {
                "id": 24,
                "name": "Pasta Carbonara",
                "calories": 237
            },
            {
                "id": 36,
                "name": "Linguine with Clams",
                "calories": 732
            },
            {
                "id": 59,
                "name": "Katsu Curry",
                "calories": 985
            }
        ]
    },
    {
        "id": 3,
        "name": "Dinner",
        "foods": [
            {
                "id": 9,
                "name": "Tuna Sashimi",
                "calories": 348
            },
            {
                "id": 28,
                "name": "Fettuccine Alfredo",
                "calories": 813
            },
            {
                "id": 30,
                "name": "Risotto with Seafood",
                "calories": 697
            },
            {
                "id": 40,
                "name": "Salmon Nigiri",
                "calories": 937
            },
            {
                "id": 41,
                "name": "Chicken Fajitas",
                "calories": 138
            },
            {
                "id": 59,
                "name": "Katsu Curry",
                "calories": 985
            }
        ]
    }
]
```
>
> Returns a json object of a single meal with all of its eaten foods

```json
{
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 7,
            "name": "Chicken Wings",
            "calories": 126
        },
        {
            "id": 3,
            "name": "Vegetable Soup",
            "calories": 895
        }
    ]
}
```
> __POST /api/meals/:meal_id/foods/:food_id__
> 
> Adds the specified food to the specified meal and returns a success message

```json
{
  "message": "Successfully added XXXtra Flamin' Hot Cheetos to Breakfast"
}
```
> __DELETE /api/meals/:meal_id/foods/:food_id__
>
> Removes the specified food from the specified meal and returns a success message"

```json
{
  "messsage": "Successfully removed Yogurt from Breakfast"
}
```
