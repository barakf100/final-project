const handleColorPallet = (color) => {
    return (theme) => theme.palette[color].main;
};
export { handleColorPallet };
