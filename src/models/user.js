const mongoose = require('mongoose')
// const getDb = require('../connect_mongodb').getDb

const Schema = mongoose.Schema
const userSchema = new Schema({
    tag: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        pf_img: {
            type: String,
        },
        status: String,
        name: {
            type: String,
            required: true
        },
    },
    settings: {
        publicSettings:{
            //0-no,1-default(all),2-friends
            allowMention:{type:Number,default:1},
            allowSend:{type:Number,default:1},
            seeSubscribers:{type:Boolean,default:false},
            seeSubscriptions:{type:Boolean,default:false},
        },
        privateSettings:{
          notifyOnSub:{type:Boolean,default:true}
        }
    },
    //user interaction lgc
    subscriptions:[
        {
            id:{
                type:Schema.Types.ObjectId,
                ref:'User',
                required: true
            },
            notify:{
                type:String,
            },
        }
        ],
    access:[{
        id:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        value:{
            type:Number,
            default:1,
        },
        details:{
            allowView:{
                type:Boolean,
                default:true
            },
            allowSend:{
                type:Boolean,
                default:true
            },
            //post with hidden tag won't be seen by user
            forbidTags:[
                {
                    tag:{type:String}
                }
            ]
        }
    }]
},{
    timestamps:true
})


userSchema.virtual('posts',{
    ref:'Post',
    localField:'_id',
    foreignField:'creator'
})

userSchema.virtual('subscribers',{
    ref:'User',
    localField:'_id',
    foreignField:'subscriptions.id'
})



module.exports =  mongoose.model('User',userSchema)

