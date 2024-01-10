import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const ButtonComp = ({ variant, color, size, href, children, onClick }) => {
    return (
        <Button variant={variant} color={color} size={size} href={href} onClick={onClick}>
            {children}
        </Button>
    );
};

ButtonComp.propTypes = {
    variant: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default ButtonComp;
