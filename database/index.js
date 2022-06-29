const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: {
    type: Number,
    unique: true
  },
  username: String,
  repoName: String,
  repoLink: String,
  size: Number
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (data, callback=()=>{}) => {
  // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
    data = new Repo(data); // instantiate data coming from api
    data.save(err => { // save instaitated data into database
      if (err) {
        data
        return;
      }
    })
}

let get = (callback= () => {}) => {
  // var allData = Repo.find({}, (err, docs) => {
  //   if (err) {
  //     callback(err);
  //     return;
  //   }
  //   console.log(docs);
  //   callback(null, docs);
  // });
  // async function start() {
  //   await Repo.deleteMany({});
  // }
  // start();
  Repo.find({})
    .sort({size: 'desc'})
    .limit(25)
    .exec((err, docs)=> {
      if (err) {
        callback(err);
      }
      console.log(docs.length);
      callback(null, docs)
    })
}

module.exports.save = save;
module.exports.get = get;