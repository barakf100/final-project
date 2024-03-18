import Accordion from "./ui/accordion";
const AllAbout = () => {
    return (
        <>
            <Accordion
                header={"Accounts"}
                text={`Marry account is for the couples who get married.
                    Caller account is for the caller who gonna call the couples invites to the wedding`}
                button={false}></Accordion>
            <Accordion header={"Register"} text={'you can create an "marry account" or "caller account"'} button={true}></Accordion>
            <Accordion header={"Login"} text={"Log in to your account"} button={true}></Accordion>
        </>
    );
};

export default AllAbout;
