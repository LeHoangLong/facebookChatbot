export const getParameter = function (paramter_name){
    var regex_str = '' + paramter_name + '=(\\w+)&*'
    var regex = new RegExp(regex_str);
    var url_str = window.location.href;
    var result = url_str.match(regex);
    if (result == null){
        return null;
    }else{
        return result[1];
    }
}
