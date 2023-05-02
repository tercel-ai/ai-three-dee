import { useEffect, useRef } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function Preview({ previewObjects }) {
  const sketchRef = useRef("");

  useEffect(() => {
    if (!previewObjects) return;
    // Create a new p5.js sketch function using the provided code
    const sketch = (p) => {
      let unit = 100;
      let angleY = 0;
      let angleX = 0;

      const drawObjects = (objects) => {
        for (let obj of objects) {
          p.push();

          p.translate(
            obj.position.x * unit,
            -obj.position.y * unit,
            obj.position.z * unit
          );
          p.rotateX(obj.rotation.x);
          p.rotateY(obj.rotation.y);
          p.rotateZ(obj.rotation.z);
          p.scale(obj.scale.x, obj.scale.y, obj.scale.z);

          if (obj.shape === "Cube") {
            p.box(unit);
          } else if (obj.shape === "Ball") {
            p.sphere(unit);
          } else if (obj.shape === "Cylinder") {
            p.cylinder(unit);
          } else if (obj.shape === "Circular Cone") {
            p.cone(unit);
          } else if (obj.shape === "Triangle Pyramid") {
            p.cone(unit, unit, 4);
          } else if (obj.shape === "Square Pyramid") {
            p.cone(unit, unit, 5);
          } else if (obj.shape === "Donut") {
            p.torus(unit, unit / 3);
          }
          p.pop();
        }
      };

      p.setup = () => {
        p.createCanvas(800, 800, p.WEBGL);
      };

      p.draw = () => {
        p.background(200);
        p.ambientLight(100);
        p.pointLight(255, 255, 255, 0, 0, 300);

        p.push();
        p.rotateY(angleY);
        p.rotateX(angleX);
        p.noStroke();

        drawObjects(previewObjects);
        p.pop();

        angleY = p.map(p.mouseX, 0, p.width, 0, p.TWO_PI);
        angleX = p.map(p.mouseY, 0, p.height, 0, p.TWO_PI);
      };
    };

    sketchRef.current = sketch;
  }, [previewObjects]);

  return <NextReactP5Wrapper sketch={sketchRef.current} />;
}