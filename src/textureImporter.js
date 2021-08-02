var getFileBlob = function (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.addEventListener('load', function() {
      cb(xhr.response);
  });
  xhr.send();
};

var blobToFile = function (blob, name) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return blob;
};

var loadImage = function (image, name) {
  var imgCanvas = document.createElement("canvas"),
  imgContext = imgCanvas.getContext("2d");

  // Make sure canvas is as big as the picture
  imgCanvas.width = image.width;
  imgCanvas.height = image.height;

  // Draw image into canvas element
  imgContext.drawImage(image, 0, 0, image.width, image.height);

  // Get canvas contents as a data URL
  var imgAsDataURL = imgCanvas.toDataURL("image/png");

  // Save image into localStorage
  try {
    localStorage.setItem(name, imgAsDataURL);
  }
  catch (e) {
    console.log("Storage failed: " + e);
  }
}

export const getFileObject = function(filePathOrUrl, cb) {
  let file = filePathOrUrl.substring(filePathOrUrl.lastIndexOf('\\') + 1);
 getFileBlob(filePathOrUrl, function (blob) {
    cb(loadImage(blob, file));
 });
};