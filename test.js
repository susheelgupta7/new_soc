const { PostAdd } = require("@material-ui/icons");

const a = [{a:3},{b:4}];
const b = [{b:4}];
for(const d of a){
    console.log(d);
    if(a.includes(b)){

        console.log(d);
    }
}
console.log("yes");

module.export = (app) => {
    app.get('api/get_feed',requireLogin,async(req,res)=> {
        try{
            user=req.user.googleId;
            let feedArr = [];
            //logic
            followedResponse= await followeduserArr.find({user:user});
            followedUserArr=[];
            for(f of followedResponse)
            {
                followedUserArr.push(F.Followed);
            }
            for(const user of followedUserArr)
            {
                let checkuser=await PostAdd.find({user:user});
                feedArr=[...checkuser,...feedArr];
            }
        }
    })
}
