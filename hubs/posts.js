const express = require("express");
const router = express.Router();
const db = require("../data/db");

router.use(express.json());

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved."
      });
    });
}); // done/working

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post[0]) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
}); //done working

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findPostComments(id)
    .then(comment => {
      if (comment.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
}); // done working

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(newPost)
      .then(addedPost => {
        res.json(addedPost);
        res.status(201);
      })
      .catch(error => {
        res.render(error);
        res.render.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
}); // done working

router.post("/:id/comments", (req, res) => {
  const { text } = req.body;
  const post_id = req.params.id;
  db.findById(post_id).then(post => {
    if (!post[0]) {
      res.status(404).json("The post with the specified ID does not exist.");
    }
  });

  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.insertComment({ text, post_id })
      .then(newcomment => {
        if (!newcomment) {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        } else {
          res.status(201).json(newcomment);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
}); // done working

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  const edit = { title, contents };

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.update(req.params.id, edit)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  }
}); // done working

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(removed => {
      if (removed) {
        res.status(200).json(removed);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
}); // done/working

module.exports = router;
