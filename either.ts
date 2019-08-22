interface Left<A> {
    value: A;
    form: 'left'
};

interface Right<B> {
    value: B;
    form: 'right'
};

type Either<A,B> = Left<A> | Right<B>;

function isLeft<A>(val: any): val is Left<A> {
    if ((val as Left<A>).form === 'left') return true;
    return false;
}

function isRight<B>(val: any): val is Right<B> {
    if ((val as Right<B>).form === 'right') return true;
    return false;
}

function Left<A,B>(val: A) : Either<A,B> {
    return { value: val, form: 'left' };
}

function Right<A,B>(val: B) : Either<A,B> {
    return { value: val, form: 'right' };
}

function eitherBind<A,B,C>(func: (b: B) => Either<A,C>, val: Either<A,B>) : Either<A,C> {
    if (isLeft(val)) return val;
    return func(val.value);
}

function eitherMap<A,B,C>(func: (b: B) => C, val: Either<A,B>) : Either<A,C> {
    if (isLeft(val)) return val;
    return Right(func(val.value));
}

interface MyError {
    msg: string
};

interface Hackathon {
    name: string;
    startDate: number;
    endDate: number;
}

function validateHackathonDates(h: Hackathon) : Either<MyError,Hackathon> {
    
    if (h.startDate > h.endDate) {
        return Left({
            msg: "The hackathon's end date is before its start date!"
        });
    }
    if (h.startDate < 0) {
        return Left({
            msg: "The hackathon's start date is negative!"
        });
    }
    if (h.endDate < 0) {
        return Left({
            msg: "The hackathon's end date is negative!"
        });
    }

    return Right(h);
}

function validateHackathonName(h: Hackathon) : Either<MyError, Hackathon> {
    if (h.name.includes("firetruck")) {
        return Left({
            msg: "Hackathon name cannot contain bad words"
        });
    }

    return Right(h);
}

function validateHackathon(h: Hackathon) : void {
    let result = eitherBind(validateHackathonDates,
                 eitherBind(validateHackathonName, Right(h)));
    if (isLeft(result)) {
        console.error(result.value.msg);
    } else {
        console.log("Valid!");
    }
}

let testH1 = {
    name: "Good Hackathon",
    startDate: 20,
    endDate: 50
};

validateHackathon(testH1);

let testH2 = {
    name: "Hackathon firetruck",
    startDate: 20,
    endDate: 10
};

validateHackathon(testH2);

let testH3 = {
    name: "Super Bad Hackathon",
    startDate: -1000000,
    endDate: -20000
}

validateHackathon(testH3);