# qs-api-express
The API is deployed [here](https://qs-api-express.herokuapp.com/).

This was build by [John Roemer](https://github.com/jtrtj) and [Tristan Bambauer](https://github.com/TristanB17)
### This API was built with Node and Express
We used PostgreSQL, Knex ORM and Mocha/Chai for testing.
## See a list of the endpoints and their returns below:

### Food endpoints

> __GET /api/foods__
> 
> Returns all foods in the database.

```json
[
    {
        "id": 1,
        "name": "Strawberries",
        "calories": 120,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 2,
        "name": "Blackberries",
        "calories": 110,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 3,
        "name": "Blueberries",
        "calories": 140,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 4,
        "name": "Raspberries",
        "calories": 200,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 5,
        "name": "Boysenberries",
        "calories": 150,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 6,
        "name": "Gooseberries",
        "calories": 220,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 7,
        "name": "Poisonberries",
        "calories": 420,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 8,
        "name": "Açaí Berries",
        "calories": 90,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 9,
        "name": "Mulberries",
        "calories": 100,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    },
    {
        "id": 10,
        "name": "Astroberries",
        "calories": 777,
        "created_at": "2018-10-17T00:39:55.102Z",
        "updated_at": "2018-10-17T00:39:55.102Z"
    }
]
```
> __GET /api/foods/:id__
>
> Returns a single food
```json
{
    "id": 3,
    "name": "Blueberries",
    "calories": 140
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
    "id": 11,
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
    "id": 11,
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
        "id": 2,
        "name": "Afternoon Tea",
        "foods": [
            {
                "id": 2,
                "name": "Blackberries",
                "calories": 110
            },
            {
                "id": 2,
                "name": "Blackberries",
                "calories": 110
            },
            {
                "id": 8,
                "name": "Açaí Berries",
                "calories": 90
            },
            {
                "id": 5,
                "name": "Boysenberries",
                "calories": 150
            }
        ]
    },
    {
        "id": 3,
        "name": "Elevenses",
        "foods": [
            {
                "id": 3,
                "name": "Blueberries",
                "calories": 140
            },
            {
                "id": 6,
                "name": "Gooseberries",
                "calories": 220
            },
            {
                "id": 7,
                "name": "Poisonberries",
                "calories": 420
            },
            {
                "id": 9,
                "name": "Mulberries",
                "calories": 100
            }
        ]
    },
    {
        "id": 1,
        "name": "Second Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Strawberries",
                "calories": 120
            },
            {
                "id": 4,
                "name": "Raspberries",
                "calories": 200
            },
            {
                "id": 10,
                "name": "Astroberries",
                "calories": 777
            }
        ]
    }
]
```
> __POST /api/meals/:meal_id/foods/:food_id__
> 
> Adds the specified food to the specified meal and returns a success message

```json
{
  "message": "Successfully added XXXtra Flamin' Hot Cheetos to Elevenses"
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
