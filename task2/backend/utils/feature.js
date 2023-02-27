class Features{
    constructor(query, queryStr){

        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        
        const firstName = this.queryStr.firstName?{

            firstName:{
                $regex:this.queryStr.firstName,
                $options:"i"
            },
        }:{};

       
       this.query = this.query.find({...firstName})
       return this;

    }
}

module.exports = Features;