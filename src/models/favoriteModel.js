import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
  favPosts: {
    type: Array,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
