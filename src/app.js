require('dotenv').config();
console.log('Testing Node on app.js');

const mongoUrl = process.env.mongo_Url;
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const PORT = process.env.PORT || 3008;
const app = express();






app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(mongoUrl)
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('recipeBook10');
    const recipesCollection = db.collection('recipes');

    app.get('/', (req, res)=> {
        res.sendFile(path.join(__dirname,"..", "public", "index.html"))
    });


   app.get('/api/recipes', (req, res) => {
      recipesCollection.find().toArray()
        .then(recipes => {
          res.json(recipes);
        })
        .catch(error => {
          console.error(`Error fetching recipes`, error);
          res.status(500).json({ error: 'Error fetching recipes' });
        });
    });

    app.get('/api/recipe/:id', (req, res) => {
        const id = req.params.id.toLowerCase();
        recipesCollection.findOne({ name: { $regex: new RegExp(`^${id}$`, 'i') } })
        .then(recipeLookUp => {
            if(recipeLookUp) {
                res.json(recipeLookUp)
               
            }else {
                res.status(404).json(`${id} Not Found`)
            }
        })
        .catch(error => {
            console.error('Error looking up recipe', error)
            res.status(500).json({error: 'Error looking up recipe'})
        })
    })
    
    app.post('/api/recipes/bulk', (req, res) => {
      const recipes = req.body;
      if(!Array.isArray(recipes) || recipes.some(recipe => !recipe.ingredients || !recipe.instructions || !recipe.name)) {
       return res.status(400).json({error: "Fields Required"})
      }
      
      
     
      recipesCollection.insertMany(recipes)
        .then(result => {
          res.status(201).json({ message: 'Recipe added successfully', result });
        })
        .catch(error => {
          console.error('Error inserting recipes:', error);
          res.status(500).json({ error: 'Error inserting recipe' });
        });
    });


    app.post('/api/recipe', (req, res) => {
        const oneRecipe = req.body;
        if (!oneRecipe.name || !oneRecipe.ingredients || !oneRecipe.instructions) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
        
        const recipeWithId = { ...oneRecipe };

        recipesCollection.insertOne(recipeWithId)
        .then(result => {
            res.status(201).json({ message: 'Recipe added successfully', result });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error inserting recipe' });
          });
    });

    app.put('/api/recipe/update/:id', (req, res) => {
        const id = req.params.id;

        const {ingredients, instructions} = req.body;
        if(!ingredients || !instructions) {
            res.status(400).json({error: 'Missing required fields'})
        }

        recipesCollection.findOneAndUpdate(
            {name: id},
            {
                $set: {
                    instructions: instructions,
                    ingredients: ingredients
                }
            },
            {
                upsert: true,
                returnDocument: 'after'
            }
        )
        .then(result => {
            if (result) {
                res.json({ message: 'Recipe updated successfully', recipe: result.value });
            } else {
                res.status(404).json({ error: 'Recipe not found' });
            }
        })
        .catch(error => {
            console.error('Error updating recipe:', error);
            res.status(500).json({ error: 'Error updating recipe' });
        });

    })

    app.delete('/api/recipe/delete/:id', (req, res) => {
        const id = req.params.id;
        recipesCollection.deleteOne({name: id})
        .then(result => {
            if(result.deletedCount === 0) {
               return res.status(404).json({error: `${id} Not Found`})
            }else {
                res.status(200).json({message: `${id} Successfully Deleted`})
            }
        })
        .catch(error => {
            console.error('Error deleting recipe:', error)
            res.status(500).json({ error: 'Error deleting recipe' });
        })
    })


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.use(express.static(path.join(__dirname, "..","public")))

  })
  .catch(error => {
    console.log("Coud not connect to Mongo", error)
  });
