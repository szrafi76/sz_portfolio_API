const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AuthSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        pic: {
            type: String,
            default: "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png",
        },
        tokens: [{ token: { type: String, required: true } }],
    },
    {
        collection: "auth_collection",
        timestamps: true,
        versionKey: false
    }
)

AuthSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

AuthSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(0);
    this.password = await bcrypt.hash(this.password, salt)
})

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;