window.addEventListener("DOMContentLoaded", () => {
  fetch("size.json")
    .then(res => res.json())
    .then(data => {
      const boxGroup = document.createElement("a-entity");
      boxGroup.setAttribute("id", "box-group");

      const steps = [
        { face: "right", color: "#FF4136" }, // ステップ1
        { face: "front", color: "#2ECC40" }, // ステップ2
        { face: "top", color: "#0074D9" }    // ステップ3
      ];

      const facePositions = {
        right:  { pos: `${data.width/2} ${data.height/2} 0`, rot: `0 0 0` },
        front:  { pos: `0 ${data.height/2} ${data.depth/2}`, rot: `0 0 0` },
        top:    { pos: `0 ${data.height} 0`, rot: `-90 0 0` }
      };

      let stepIndex = 0;

      function showStep(index) {
        boxGroup.innerHTML = ''; // 古い面を消す

        const step = steps[index];
        const face = document.createElement("a-plane");

        face.setAttribute("width", data.width);
        face.setAttribute("height", data.height);
        face.setAttribute("color", step.color);
        face.setAttribute("opacity", 0.6);

        face.setAttribute("position", facePositions[step.face].pos);
        face.setAttribute("rotation", facePositions[step.face].rot);

        boxGroup.appendChild(face);
      }

      // 最初のステップ表示
      showStep(stepIndex);

      // クリックで次のステップへ
      document.addEventListener("click", () => {
        stepIndex = (stepIndex + 1) % steps.length;
        showStep(stepIndex);
      });

      const markerRoot = document.querySelector("#marker-root");
      markerRoot.appendChild(boxGroup);
    });
});
