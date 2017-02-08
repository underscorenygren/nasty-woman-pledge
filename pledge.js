let arr = Array(21).fill().map((_, i) => (i % 9) + 1),
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
    const $img = 
      $("<img>").attr({
        src: img,
        width: imgSpec.width,
        height: imgSpec.height,
      }),
      $cont = $("<div>")
        .attr({
          width: imgSpec.width,
          height: imgSpec.height - 4,
        })
        .css({
          position: "relative",
          display: "inline"
        })
        .append($img);
    insert.append($cont);
    log("inserted img", img, $img);
  });
};

const parsePX = ($elem, attrName) => {
  const unparsed = $elem.css(attrName);
  return parseInt(unparsed.substr(0, unparsed.length -2));
};

const isFirstRow = (img) => {
  return img.offsetTop < imgSpec.height;
};

const scroll = () => {
  log("scroll");
  $("img").each((i, img) => {
    const $img = $(img),
          oldTop = $img.css('top'),
          newTop = oldTop ? 
            parseInt(oldTop) + 10 :
            10,
          $wall = $("#wall"),
      //wm = parsePX($wall, "margin-top"),
      //wp = parsePX($wall, "padding-top"),
      translation = imgSpec.height;

    log("translating to", translation);
    /*img.animate([
      {transform: 'translate(0, 100px)'}
    ], 2000);*/
    $img.css(
      {transform: 'translate(0, -' + translation + 'px)',
        transitionDuration: '1s'
      }
    );
    $img.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
      ((remove) => {
        return (e) => { 
          if (remove) {
            log("removing img", $img, e); 
            $img.remove();
          } else {
            log("resetting transformation", $img, e);
            $img.css({
              transform: "none",
              transitionDuration: "0s"
            });
          }
        };
      })(isFirstRow(img))
    );
  });
};

$(document).ready(() => {
  log("document ready");
  loadImages();
});
