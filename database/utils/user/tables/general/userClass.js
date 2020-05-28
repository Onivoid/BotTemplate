const UserClass = class {
    constructor(userId,exp,expTimer,level,rep,repTimer,floodCounter,warning){
        this.userId = userId;
        this.exp = exp;
        this.expTimer = expTimer;
        this.level = level;
        this.rep = rep;
        this.repTimer = repTimer;
        this.floodCounter = floodCounter;
        this.warning = warning;
    }
    toJSON(){
        return {
            userId: this.userId,
            exp: this.exp,
            expTimer: this.expTimer,
            level: this.level,
            rep: this.rep,
            repTimer: this.repTimer,
            floodCounter: this.floodCounter,
            warning: this.warning
        }
    }
}

module.exports = UserClass;