module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            email: String,
            birthday: Date,
            gender: String,
            color: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Employee = mongoose.model("employee", schema);
    return Employee;
};