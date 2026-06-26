function convertBGColorToHWB(tint, brightness) {
  let h = 216 + tint * 1.8 % 360;
  let w;
  let b;
  // brightness isn't 100% accurate but it works
  if (brightness < 0) {
    w = 0;
    b = 0 - brightness;
  } else {
    w = brightness;
    b = 0;
  }
  return `hwb(${h}deg ${w}% ${b}%)`;
}

$("#convert")[0].addEventListener("click", () => {
  if (!($("#gdtLevel")[0].value == "")) {
    try {
      let gdt = $("#gdtLevel")[0].value;

      let gdtBGCol = gdt.split("~")[0].split("_")[1];
      let gdtBGBrightness = gdt.split("~")[0].split("_")[2];

      let temporary = document.createElement("p");
      temporary.style.color = convertBGColorToHWB(gdtBGCol, gdtBGBrightness);
      let rgb = temporary.style.color.slice(4, temporary.style.color.length - 1).replaceAll(" ", "").split(",");

      let gd = `kS38,1_${rgb[0]}_2_${rgb[1]}_3_${rgb[2]}_11_255_12_255_13_255_4_-1_6_1000_7_1_15_1_18_0_8_1|1_${rgb[0] - 15}_2_${rgb[1] - 15}_3_${rgb[2] - 15}_11_255_12_255_13_255_4_-1_6_1001_7_1_15_1_18_0_8_1|1_0_2_102_3_255_11_255_12_255_13_255_4_-1_6_1009_7_1_15_1_18_0_8_1|1_255_2_255_3_255_11_255_12_255_13_255_4_-1_6_1002_5_1_7_1_15_1_18_0_8_1|1_255_2_255_3_255_11_255_12_255_13_255_4_-1_6_1005_5_1_7_1_15_1_18_0_8_1|1_255_2_255_3_255_11_255_12_255_13_255_4_-1_6_1006_5_1_7_1_15_1_18_0_8_1|,kA13,0,kA15,0,kA16,0,kA14,,kA6,0,kA7,0,kA17,0,kA18,0,kS39,0,kA2,0,kA3,0,kA8,0,kA4,4,kA9,0,kA10,0,kA11,0;`;
      let gdtObjects = gdt.split("~")[1];

      gdtObjects.split(";")
      .forEach(obj => {
        if (!(obj == "")) {
          let id = obj.split(",")[0];
          let x = obj.split(",")[1];
          let y = obj.split(",")[2];
          let dir = obj.split(",")[3];

          gd = `${gd}1,${id},2,${x},3,${y},6,${dir};`;
        }
      });

      let gdtBgID = Number(gdt.split("~")[0].split("_")[0]);
      let gdBgID = 0;
      switch (gdtBgID) {
        case 1:
          gdBgID = 0;
          break;
        case 2:
          gdBgID = 6;
          break;
        case 3:
          gdBgID = 10;
          break;
        default:
          gdBgID = 9;
          break; 
      }

      if ($("#GMD")[0].checked) {

        let gmd = `<d>\n</d>`;
        let file = new File(
          [gmd],
          "converted.gmd"
        );
        saveAs(file);

      } else {

        let file = new File(
          [gd],
          "converted.txt"
        );
        saveAs(file);

      }
    } catch (e) {
      alert(`There was an error converting the level:\n\n${e}`);
    }
  }
});