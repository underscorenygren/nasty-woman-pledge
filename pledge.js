let arr = Array(30).fill().map((_, i) => (i % 9) + 1),
    DEBUG = true,
    log = DEBUG ? console.log.bind(window.console) : () => {}, 
    imgSpec = {
      width: 200,
      height: 300
    },
    imgs = _.map(arr,
  (elem) => {
    return "/imgs/" + elem + ".jpg";
  });

const loadImages = () => {
  log("loading images");
  let insert = $("#wall");
  _.each(imgs, (img) => {
    log("loading image", img);
    insert.append(
      $("<img>").attr({
        src: img,
        width: imgSpec.width,
        height: imgSpec.height,
      }).css({
        position: "relative"
      })
    );
  });
};

const scroll = () => {
  log("scroll");
  $("img").each((i, img) => {
    const $img = $(img),
          oldTop = $img.css('top'),
          newTop = oldTop ? 
            parseInt(oldTop) + 10 :
            10;
    log("setting new top to", newTop, "for img", $img);
    /*img.animate([
      {transform: 'translate(0, 100px)'}
    ], 2000);*/
    $img.css(
      {transform: 'translate(0, -' + imgSpec.height + 'px)'}
    );

    //$img.css("top", newTop);
  });
};

$(document).ready(() => {
  log("document ready");
  loadImages();
});
