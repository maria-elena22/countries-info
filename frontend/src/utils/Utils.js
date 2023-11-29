class Utils {
  static formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  static convertCoordinates(latitude, longitude) {
    const latDirection = latitude >= 0 ? "N" : "S";
    const longDirection = longitude >= 0 ? "E" : "W";

    latitude = Math.abs(latitude);
    longitude = Math.abs(longitude);

    const latDegree = Math.floor(latitude);
    const latMinute = Math.floor((latitude - latDegree) * 60);

    const longDegree = Math.floor(longitude);
    const longMinute = Math.floor((longitude - longDegree) * 60);

    return `${latDegree}°${latMinute}'${latDirection}, ${longDegree}°${longMinute}'${longDirection}`;
  }

  static capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default Utils;
