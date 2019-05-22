
const changeThemeColor = (color)=>{
    return {
        type:'theme_color_change',
        value:color
      };
}

module.exports = {
    changeThemeColor,
};