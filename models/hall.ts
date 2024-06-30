import mongoose, {Schema, model, models} from "mongoose";

const hallSchema=new Schema(
    {
        logoUrl: {
            type: String,
            required: true,
            default:'',
        },
        dragonLogoUrl: {
            type: String,
            required: true,
            default:'',
        },
        emblemUrl: {
            type: String,
            required: true,
            default:'',
        },
        whiteEmblemUrl: {
            type: String,
            required: true,
            default:'',
        },
        title: {
          type: String,
          required: true,
          default:'',
        },
        subTitle: {
          type: String,
          required: true,
          default:'',
        },
        heroBackgroundPhotoUrl: {
            type: String,
            required: true,
            default:'',
        },
        motto: {
          type: String,
          required: true,
          default:'',
        },
        englishMotto: {
          type: String,
          required: true,
          default:'',
        },
        aboutUs: {
          type: String,
          required: true,
          default:'',
        },
        sardarVallabhBhaiPatelPhotoUrl: {
            type: String,
            required: true,
            default:'',
        },
        constitutionDriveLink: {
            type: String,
            required: true,
            default:'',
        },
        quoteBackgroundPhotoUrl: {
            type: String,
            required: true,
            default:'',
        },
        quote: {
            type: String,
            required: true,
            default:'',
        },
        qouteAuthor: {
            type: String,
            required: true,
            default:'',
        },
        address: {
            type: String,
            required: true,
            default:'',
        },
        officePhone: {
            type: String,
            required: true,
            default:'',
        },
        securityPhone: {
            type: String,
            required: true,
            default:'',
        },
        socials:[
            {
                type:Object,
                required:true,
                socialType:{type:String, required:true, default: '',},
                url:{type:String,required:true, default: ''},
            },
        ],
        primaryColour: {
            type: String,
            required: true,
            default:'',
        },
        secondaryColour: {
            type: String,
            required: true,
            default:'',
        },
    },
);

const Hall=models.Hall || model("Hall", hallSchema);
export default Hall;