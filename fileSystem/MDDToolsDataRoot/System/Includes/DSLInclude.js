  //-----------------------
  // Define specific shapes
  //-----------------------
  go.Shape.defineFigureGenerator("BendedLeft", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("BendedLeftRight", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  }); 
  go.Shape.defineFigureGenerator("File", function(shape, w, h) {
    const d = 20;
    let geo = new go.Geometry();
    let fig = new go.PathFigure(0, 0, true); // starting point
    geo.add(fig);
    fig.add(new go.PathSegment(go.PathSegment.Line, w-d, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, d));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    let fig2 = new go.PathFigure(w-d, 0, false);
    geo.add(fig2);
    // The Fold
    fig2.add(new go.PathSegment(go.PathSegment.Line, w-d, d));
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, d));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    //geo.spot1 = new go.Spot(0, 0.25);
    //geo.spot2 = go.Spot.BottomRight;
    return geo;
  });
  go.Shape.defineFigureGenerator("FileCircle", function(shape, w, h) {
    const d = 20;
    let geo = new go.Geometry();
    let fig = new go.PathFigure(0, 0, true); // starting point
    geo.add(fig);
    fig.add(new go.PathSegment(go.PathSegment.Line, w-d, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, d));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    let fig2 = new go.PathFigure(w-d, 0, false);
    geo.add(fig2);
    // The Fold
    fig2.add(new go.PathSegment(go.PathSegment.Line, w-d, d));
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, d));
    let fig3 = new go.PathFigure(d/2, h-d/2, true);
    geo.add(fig3);
    // The Fold
    fig3.add(new go.PathSegment(go.PathSegment.Arc,0, 330, d/2, h-d/2, 3*d/8, 3*d/8));


    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    //geo.spot1 = new go.Spot(0, 0.25);
    //geo.spot2 = go.Spot.BottomRight;
    return geo;
  });
  go.Shape.defineFigureGenerator("Folder", function(shape, w, h) {
    const d = 10;
    const L = 50;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 2*d, true)
      .add(new go.PathSegment(go.PathSegment.Arc,180, 90, d, 2*d, d, d)) 
      .add(new go.PathSegment(go.PathSegment.Line, w-L, d))
      .add(new go.PathSegment(go.PathSegment.Arc,180, 90, w-L+d, d, d, d)) 
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Arc,-90, 90, w-d, d, d, d))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("LeftPointOutLevelDown", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/2).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("LeftPointOutLevelUp", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/2).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("LeftPointSquare", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/2).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("Project", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(2*d, d, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, d))
      .add(new go.PathSegment(go.PathSegment.Arc,-90, 90, w-d, 2*d, d, d))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Arc,0, -90, w-d, h, d, d))
      .add(new go.PathSegment(go.PathSegment.Line, d, h-d))
      .add(new go.PathSegment(go.PathSegment.Arc,90, 270, d, h-2*d, d, d))
      .add(new go.PathSegment(go.PathSegment.Line, 2*d, d))
      .add(new go.PathSegment(go.PathSegment.Arc,0, -180, d, d, d, d))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h-2*d))
      .add(new go.PathSegment(go.PathSegment.Arc,180, 180, d, h-2*d, d, d).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("RightPointExternalArrowIn", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("RightPointExternalDiamon", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("RightPointInternalArrowIn", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 2*h/5).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("RightPointInternalDiamon", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/2).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("RightPointLeftPoint", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/2).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("RightPointOutLevelDown", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("RightPointOutLevelUp", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, h))
      .add(new go.PathSegment(go.PathSegment.Line, d, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("RightPointSquare", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("RightPointSquarePort", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 0).close()));
    geo.spot1 = new go.Spot(0, 0, 1*d, 0.5);
    geo.spot2 = new go.Spot(1, 1, -1*d, -0.5);
    return geo;
  });
  go.Shape.defineFigureGenerator("RightPointUShape", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 0))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 0))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });  
  go.Shape.defineFigureGenerator("SquareArrowIn", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("SquareExternalArrowOut", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("SquareInternalArrowOut", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });
  go.Shape.defineFigureGenerator("SquareLevelDown", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("SquareLevelMiddle", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });			 
  go.Shape.defineFigureGenerator("SquareLevelUp", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });	
  go.Shape.defineFigureGenerator("SquareUShape", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 0))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 0))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });  
  go.Shape.defineFigureGenerator("UShapeInternalArrowOut", function(shape, w, h) {
    const d = 10;
    let geo = new go.Geometry()
      .add(new go.PathFigure(d, 0, true)
      .add(new go.PathSegment(go.PathSegment.Line, w, 0))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 2*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 3*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w-d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, w, h/2))
      .add(new go.PathSegment(go.PathSegment.Line, w, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, h))
      .add(new go.PathSegment(go.PathSegment.Line, 0, 0))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 0))
      .add(new go.PathSegment(go.PathSegment.Line, d/2, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 4*h/5))
      .add(new go.PathSegment(go.PathSegment.Line, d, 0).close()));
    geo.spot1 = new go.Spot(0, 0, d, 0);
    geo.spot2 = new go.Spot(1, 1, -d, 0);
    return geo;
  });

  //-----------------------
  // Define specific menus
  //-----------------------
  

  /*
  function changeFileType(e, button) {
    e.handled = true;  // don't let the click bubble up
    let fileTypeName = e.targetObject.text;
    const diagram = button.diagram;
    const data = button.part.data;
    updateFileType( fileTypeName, data, diagram );
  }
  
  var fileTypeMenuTemplate = 
  $("ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "Javascript"),     { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "JSON"),           { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "HTML"),           { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "WebPage"),        { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "CSS"),            { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "Python"),         { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "C"),              { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "H"),              { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "C++"),            { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "H++"),            { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "C#"),             { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "Binary"),         { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "Rich Text EJS"),  { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "Rich Text SBE"),  { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "Text"),           { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "JPEG"),           { defaultStretch: go.GraphObject.Horizontal, click: changeFileType }),
    $("ContextMenuButton", $(go.TextBlock, "PNG"),            { defaultStretch: go.GraphObject.Horizontal, click: changeFileType })
  );
  */

  function updateFileType( fileTypeName, data, diagram ) {
    if( fileTypeName ) {
      diagram.startTransaction("change file type");
        // Change modality in model with the menu text
        diagram.model.set(data, "fileType", codeFileType[fileTypeName].fileType);
        diagram.model.set(data, "fileTypeName", fileTypeName);
        // Find all links in fanout and update their color
        const key = data.key;
        const node = diagram.findNodeForKey(key);
        let linkIterator = node.findLinksOutOf().iterator;
        while (linkIterator.next()) {
          const linkData = linkIterator.value.data;
          diagram.model.setDataProperty( linkData, 'color', codeFileType[fileTypeName].color );
        }
        // Change node color
        diagram.model.set(data, "color", codeFileType[fileTypeName].color);
        //console.log(data)
      diagram.commitTransaction("change file type");
    }
  }
  function createFileTypeMenu() {
    let menu = { layout: 'vertical', itemList: [] };
    // 'do' part of the menu item
    const menuItemClicked = function(o) {
      console.log( o );
      const fileTypeName = o.item.label;
      const diagram = o.d.diagram;
      const it = o.d.diagram.selection.iterator;
      const node = it.first();
      if( node ) {
        const data = node.data;
        updateFileType( fileTypeName, data, diagram );
      }
    }

    /*
      Create an array of menu itme in this form:
      menuItem =
        { layout: 'vertical', itemList: [
          { label: 'cut', if: ( o )=> true,
                          do: ( o )=> console.log('######')},
          { label: ... },
        ]},
    */
    for( const fileTypeName in codeFileType ) {
      const menuItem = {
        label: fileTypeName,
        do: menuItemClicked,
      };
      menu.itemList.push( menuItem );
    }
    return( menu );
  }
  var menuDSL = {
    'fileTypeMenu': createFileTypeMenu(),
    'basicNodeMenu': 
      { layout: 'vertical', itemList: [
//        { fontIcon: 'menu', hint: 'Options', layout: 'vertical', subMenu: [
          { fontIcon: 'contrast', hint: 'Shape', layout: 'horizontal', subMenu: [
            { fontIcon: 'ban', hint: 'Circle' },
            { fontIcon: 'browser', hint: 'Rectangle' },
          ]},
          { fontIcon: 'cloudy', hint: 'Color', layout: 'horizontal', subMenu: [
            { fontIcon: 'ban', hint: 'Circle' },
            { fontIcon: 'text', hint: 'Rectangle' },
          ]},
          { fontIcon: 'clock', hint: 'Border' },
          { fontIcon: 'text', hint: 'Text' },
          { fontIcon: 'contrast', hint: 'Shape', layout: 'horizontal', subMenu: [
            { fontIcon: 'ban', hint: 'Circle' },
            { fontIcon: 'browser', hint: 'Rectangle' },
          ]},
        ]},
 //     ]},
  };

  //-----------------------
  // Define node templates
  //-----------------------
  function addTable1Row(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      let diagram = node.diagram;
      diagram.startTransaction("Add table row");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.rows;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.rows;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "name": "value1"} );
      diagram.commitTransaction("Add table row");
    }
  }
  function addTable2Row(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      let diagram = node.diagram;
      diagram.startTransaction("Add table row");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.rows;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.rows;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "name": "name1", "value": "value1"} );
      diagram.commitTransaction("Add table row");
    }
  }
  function addTable3Row(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      let diagram = node.diagram;
      diagram.startTransaction("Add table row");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.rows;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.rows;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "name": "name1", "value": "value1", "unit": "unit1" } );
      diagram.commitTransaction("Add table row");
    }
  }
  function deleteTableRow(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      if (items.length > 0) {  // if there are any selected items, delete them
        let diagram = node.diagram;
        diagram.startTransaction("Delete table row");
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData.rows;
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf(itemData);
          diagram.model.removeArrayItem(itemArray, itemIndex);
        }
        diagram.commitTransaction("Delete table row");
      }
    }
  }
  function findTableSelectedItems( node ) {
    var items = [];
    var table = node.findObject("TABLE");
    if( table ) {
      for( var iit = table.elements; iit.next(); ) {
        var itempanel = iit.value;
        if( itempanel.background !== "transparent" ) {
          items.push(itempanel);
        }
      }
    }
    return items;
  }
  function findPortSelectedItems( node , portSide) {
    var items = [];
    var portPanel = node.findObject(portSide);
    if( portPanel ) {
      // Iterate on port items
      for( let it1 = portPanel.elements; it1.next(); ) {
        const panelItem = it1.value;
        
        // Find the next shape in the part hierarchy
        const it2 = panelItem.elements;
        it2.next();
        const obj = it2.value;
        if( obj.constructor.className == "Shape" ) {
          // Check if port shape is not white (means selected)
          if( obj.fill !== "white" ) {
            items.push(panelItem);
          }
        }
      }
    }
    return items;
  }
  function addInPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "INPORT" );
      console.log(items);
      let diagram = node.diagram;
      diagram.startTransaction("Add in port");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.in;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.in;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "portId": "in"} );
      diagram.commitTransaction("Add in port");
    }
  }
  function addOutPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "OUTPORT" );
      console.log(items);
      let diagram = node.diagram;
      diagram.startTransaction("Add out port");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.out;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.out;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "portId": "out"} );
      diagram.commitTransaction("Add out port");
    }
  }
  function deleteInPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "INPORT" );
      if (items.length > 0) {  // if there are any selected items, delete them
        let diagram = node.diagram;
        diagram.startTransaction("Delete in port");
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData.in;
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf(itemData);
          diagram.model.removeArrayItem(itemArray, itemIndex);
        }
        diagram.commitTransaction("Delete in port");
      }
    }
  }
  function deleteOutPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "OUTPORT"  );
      if (items.length > 0) {  // if there are any selected items, delete them
        let diagram = node.diagram;
        diagram.startTransaction("Delete out port");
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData.out;
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf(itemData);
          diagram.model.removeArrayItem(itemArray, itemIndex);
        }
        diagram.commitTransaction("Delete out port");
      }
    }
  }
  function getReducedSize( sSize ) {
    const s = new go.Size.parse( sSize );
    return( new go.Size( s.width-10, s.height-10 ))
  }
  function getDefaultPicture( fileURL ) {
    if( fileURL ) {
      return( fileURL );
    } else {
      return( config.host.fileServerURL+"/pictures/Monalisa.png" );
    }
  }
  function commonLinkProps( param ) {
    return(
      {
        toSpot: ( param.toSpot? param.toSpot: go.Spot.Center ),
        fromSpot: ( param.fromSpot? param.fromSpot: go.Spot.Center ),
        portId: ( param.portId? param.portId: "" ), 
        cursor: "pointer",  // the Shape is the port, not the whole Node
        // allow all kinds of links from this port
        fromLinkable: ( param.fromLinkable !== undefined? param.fromLinkable: true ),
        fromLinkableSelfNode: ( param.fromLinkableSelfNode !== undefined? param.fromLinkableSelfNode: false ),
        fromLinkableDuplicates: ( param.fromLinkableDuplicates !== undefined? param.fromLinkableDuplicates: false ),
        fromMaxLinks: ( param.fromMaxLinks !== undefined? param.fromMaxLinks: Infinity ),
        // allow all kinds of links to this port
        toLinkable: ( param.toLinkable !== undefined? param.toLinkable: true ),
        toLinkableSelfNode: ( param.toLinkableSelfNode !== undefined? param.toLinkableSelfNode: false ),
        toLinkableDuplicates: ( param.toLinkableDuplicates !== undefined? param.toLinkableDuplicates: false ),
        toMaxLinks: ( param.toMaxLinks !== undefined? param.toMaxLinks: Infinity ),
      }
    );
  }
  function textAlignment( param ) {
    param.labelVerticalAlignment = ( param.labelVerticalAlignment? param.labelVerticalAlignment: "center" );
    param.labelHorizontalAlignment = ( param.labelHorizontalAlignment? param.labelHorizontalAlignment: "center" );
    let x,y,dx,dy,x0,y0;
    const result = {};
    switch( param.labelVerticalAlignment.toLowerCase() ) {
      case 'above':
        y = 0;
        dy = -2;
        y0 = 1;
        break;
      case 'top':
        y = 0;
        dy = 2;
        y0 = 0;
        break;
      case 'center':
        y = 0.5;
        dy = 0;
        y0 = 0.5;
        break;
      case 'bottom':
        y = 1;
        dy = -2;
        y0 = 1;
        break;
      case 'below':
        y = 1;
        dy = 2;
        y0 = 0;
        break;
    }
    switch( param.labelHorizontalAlignment.toLowerCase() ) {
      case 'outsideleft':
        x = 0;
        dx = -2;
        x0 = 1;
        break;
      case 'left':
        x = 0;
        dx = 2;
        x0 = 0;
        break;
      case 'center':
        x = 0.5;
        dx = 0;
        x0 = 0.5;
        break;
      case 'right':
        x = 1;
        dx = -2;
        x0 = 1;
        break;
      case 'outsideright':
        x = 1;
        dx = 2;
        x0 = 0;
        break;
    }
    result.alignment = new go.Spot(x, y, dx, dy );
    result.alignmentFocus = new go.Spot( x0, y0 );
    return( result );
  }

  var nodeButtonFileContent = 
  `var event, obj, nodeData;
  // Uncomment the next line to start debugging
  //debugger;
console.log( 'NodeData Info: '+JSON.stringify( nodeData ) );
console.log( 'Button Label: '+obj.data.name );
console.log( 'Button Status: '+obj.data.checked );`;

  var dsl_Component = (param)=> {
    param = ( param? param: {} );
    param.label = ( param.label !== undefined? param.label: '' );

    param.hasTag = ( param.hasTag !== undefined? param.hasTag: true );
    param.tag = ( param.tag !== undefined? param.tag: '' );
    param.tagFont = ( param.tagFont? param.tagFont: "italic 10px sans-serif" );
    param.tagStroke = ( param.tagStroke? param.tagStroke: "Black" );
    param.isTagEditable = ( param.isTagEditable !== undefined? param.isTagEditable: true );
    param.tagMenu = ( param.tagMenu? param.tagMenu: null );

    param.hasType = ( param.hasType !== undefined? param.hasType: true );
    param.type = ( param.type !== undefined? param.type: '' );
    param.typeFont = ( param.typeFont? param.typeFont: "italic 10px sans-serif" );
    param.typeStroke = ( param.typeStroke? param.typeStroke: "Black" );
    param.isTypeEditable = ( param.isTypeEditable !== undefined? param.isTypeEditable: true );
    param.typeMenu = ( param.typeMenu? param.typeMenu: null );

    param.hasFunctionButtons = ( param.hasFunctionButtons !== undefined? param.hasFunctionButtons: false );
    param.buttonInternalCallback = ( param.buttonInternalCallback? param.buttonInternalCallback: null );
    param.isCheckBoxes = ( param.isCheckBoxes !== undefined? param.isCheckBoxes: false );

    param.hasProperties = ( param.hasProperties !== undefined? param.hasProperties: true );
    param.canAddProperties = ( param.canAddProperties !== undefined? param.canAddProperties: true );
    param.canAddProperties = ( param.hasProperties? param.canAddProperties: false );

    param.hasValue = ( param.hasValue !== undefined? ( param.hasUnit? true: param.hasValue ): true );
    param.valueFont = ( param.valueFont? param.valueFont: "13px sans-serif" );
    param.valueStroke = ( param.valueStroke? param.valueStroke: "Black" );
    param.isValueEditable = ( param.isValueEditable !== undefined? param.isValueEditable: true );

    param.hasUnit = ( param.hasUnit !== undefined? param.hasUnit: true );
    param.unitFont = ( param.unitFont? param.unitFont: "13px sans-serif" );
    param.unitStroke = ( param.unitStroke? param.unitStroke: "Black" );
    param.isUnitEditable = ( param.isUnitEditable !== undefined? param.isUnitEditable: true );
    

    param.hasInputs = ( param.hasInputs !== undefined? param.hasInputs: true );
    param.canAddInput = ( param.canAddInput !== undefined? param.canAddInput: true );
    param.canAddInput = ( param.hasInputs? param.canAddInput: false );

    param.hasOutputs = ( param.hasOutputs !== undefined? param.hasOutputs: true );
    param.canAddOutput = ( param.canAddOutput !== undefined? param.canAddOutput: true );
    param.canAddOutput = ( param.hasOutputs? param.canAddOutput: false );

    param.isPortInside = ( param.isPortInside? param.isPortInside: false );

    function runGraphFile( event, obj ) {
      const executeButtonFunc = function( event, obj, nodeData ) {
        // var event;    // event information (e.g. keyboard status...)
        // var obj;      // button object information
        // var nodeData; // node containing the button
        //
        // const buttonLabel = obj.data.name;
        // const buttonStatus = obj.data.checked;
        //
        const fileContent = obj.part.data['fileContent'];
        if( fileContent ) {
          eval( fileContent );
        }
      };
      const nodePart = obj.part;
      const diagram = nodePart.diagram;
      diagram.startTransaction("Check Box");
      diagram.model.setDataProperty(obj.data,'checked',!obj.data.checked);
      diagram.commitTransaction("Check Box");
      const node = diagram.findNodeForKey(nodePart.key);
      const nodeData = node.data;
      //const nodeDataJSON = JSON.stringify( nodeData, null, 2 );
      executeButtonFunc( event, obj, nodeData );
    };

    let textBinding = new go.Binding("text", "label").makeTwoWay();
    if( param.label && param.label.startsWith('@') ) {
      textBinding = new go.Binding("text", param.label.substring(1)).makeTwoWay();
    }    
    let tagBinding = new go.Binding("text", "tag").makeTwoWay();
    if( param.tag && param.tag.startsWith('@') ) {
      tagBinding = new go.Binding("text", param.tag.substring(1)).makeTwoWay();
    }    
    let typeBinding = new go.Binding("text", "type").makeTwoWay();
    if( param.type && param.type.startsWith('@') ) {
      typeBinding = new go.Binding("text", param.type.substring(1)).makeTwoWay();
    }    
    
    let valueItem = {};
    let addFunction = addTable1Row;
    if( param.hasValue ) {
      addFunction = addTable2Row;
      valueItem = 
      $(go.TextBlock,
        {
          column: 1,
          margin: new go.Margin(0, 2),
          stretch: go.GraphObject.Horizontal,
          font: param.valueFont,
          stroke: param.valueStroke,
          overflow: go.TextBlock.OverflowEllipsis,
          editable: param.isValueEditable,
        },
        new go.Binding("text", "value").makeTwoWay()
      );
    }
    
    let unitItem = {};
    if( param.hasUnit ) {
      addFunction = addTable3Row;
      unitItem = 
      $(go.TextBlock,
        {
          column: 2,
          margin: new go.Margin(0, 2),
          stretch: go.GraphObject.Horizontal,
          font: param.unitFont,
          stroke: param.unitStroke,
          overflow: go.TextBlock.OverflowEllipsis,
          editable: param.isUnitEditable,
        },
        new go.Binding("text", "unit").makeTwoWay()
      );
    }
    
    let tagText = {};
    if( param.hasTag ) {
      tagText = 
      $(go.TextBlock,
        {
          height: 10, 
          font: param.tagFont,
          stroke: param.tagStroke,
          alignment: new go.Spot(0, 1, 0, 0),
          margin: 0,  // make some extra space for the shape around the text
          isMultiline: false,  // don't allow newlines in text
          editable: param.isTagEditable,  // allow in-place editing by user
          contextMenu: param.tagMenu,
       },
        tagBinding
      );
    }    
    
    let typeText = {};
    if( param.hasType ) {
      typeText = 
      $(go.TextBlock,
        {
     
          height: 10, 
          font: param.typeFont,
          stroke: param.typeStroke,
          alignment: new go.Spot(0, 0, 0, 0),
          margin: 0,  // make some extra space for the shape around the text
          isMultiline: false,  // don't allow newlines in text
          editable: param.isTypeEditable,  // allow in-place editing by user
          contextMenu: param.typeMenu,
       },
        typeBinding
      );
    }    
    
    let functionButtons = {};
    if( param.hasFunctionButtons ) {
      const buttonType = ( param.isCheckBoxes? "CheckBox": "Button" );
      functionButtons =
      $(go.Panel, "Vertical",
        {
          minSize: new go.Size(NaN, 1)
        },
        new go.Binding("itemArray", "buttons"),
        {
          row: 0, column: 0,
          itemTemplate:
          $(buttonType, "checked",
            { 
              minSize: ( param.buttonMinSize? param.buttonMinSize: new go.Size(NaN, 20)), 
              maxSize: ( param.buttonMaxSize? param.buttonMaxSize: new go.Size(NaN, NaN)), 
              margin: ( param.buttonMargin? param.buttonMargin: 2 ),
              "ButtonBorder.fill": ( param.buttonFill? param.buttonFill: "lightGray"), 
              "ButtonBorder.stroke": ( param.buttonStroke? param.buttonStroke: "black"),
              click: ( param.buttonInternalCallback? param.buttonInternalCallback: runGraphFile ),
            },
            $(go.TextBlock,
              {
                //text: "Click me!",
                margin: ( param.buttonMargin? param.buttonMargin: 2 ),
                font: ( param.buttonFont? param.buttonFont: "13px sans-serif" ),
                stroke: ( param.buttonStroke? param.buttonStroke: "Black" ),
              },
              new go.Binding("text", "name")
            )
          ) // Button
        } 
      ); // Vertical Panel 
    }
  
    let addPropertyButton = {};
    let deletePropertyButton ={};
    if( param.canAddProperties ) {
      addPropertyButton =
      $("Button",
        { 
          name: "DYNAMIC BUTTONS",
          row:1, column: 0,
          alignment: go.Spot.Left,
          visible: false,
        },
        $(go.Shape, "PlusLine", { width: 8, height: 8 }),
        { click: addFunction }
      );
      deletePropertyButton =
      $("Button",
        { 
          name: "DYNAMIC BUTTONS",
          row:1, column: 0,
          alignment: go.Spot.Right,
          visible: false,
        },
        $(go.Shape, "minusLine", { width: 8, height: 8 }),
        { click: deleteTableRow }
      );
    }
    
    let properties = {};
    if( param.hasProperties ) {
      properties =
      $(go.Panel, "Auto",
        {
          row: 2, column: 1,
          stretch: go.GraphObject.Horizontal, 
        },
        $(go.Panel, "Table",
          {
          },
          $(go.Shape,
            { 
              row:0, column: 0,
              fill: ( param.fillItem? param.fillItem: "white" ), 
              stretch: go.GraphObject.Fill, 
           }
          ),
          $(go.Panel, "Table",
            {
              row:0, column: 0,
              name: "TABLE", 
              stretch: go.GraphObject.None,
              minSize: ( param.itemMinSize? param.itemMinSize: new go.Size(150, 1) ),
              defaultColumnSeparatorStroke: ( param.separatorStroke? param.separatorStroke: "gray" ),
              defaultRowSeparatorStroke: ( param.separatorStroke? param.separatorStroke: "gray" ),
              itemTemplate: 
              $(go.Panel, "TableRow", 
                { 
                  background: "transparent", 
                  // allow the user to select items -- the background color indicates whether "selected"
                  click: function(e, item) {
                    // assume "transparent" means not "selected", for items
                    var oldskips = item.diagram.skipsUndoManager;
                    item.diagram.skipsUndoManager = true;
                    if (item.background === "transparent") {
                      item.background = ( param.selectFill? param.selectFill: "dodgerblue" );
                    } else {
                      item.background = "transparent";
                    }
                    item.diagram.skipsUndoManager = oldskips;
                  }
                },
                $(go.TextBlock,
                  {
                    column: 0,
                    margin: new go.Margin(0, 2),
                    stretch: go.GraphObject.Horizontal,
                    font: ( param.keyFont? param.keyFont: "bold 13px sans-serif" ),
                    stroke: ( param.keyStroke? param.keyStroke: "Black" ),
                    wrap: go.TextBlock.None,
                    overflow: go.TextBlock.OverflowEllipsis,
                    editable: ( param.keyEditable !== undefined? param.keyEditable: true ),
                    fromLinkable: false, 
                    toLinkable: false
                  },
                  new go.Binding("text", "name").makeTwoWay()
                ),
                valueItem,
                unitItem
              )
            },
            new go.Binding("itemArray", "rows").makeTwoWay()
          ), //Table
          addPropertyButton,
          deletePropertyButton
        ) // Table
      ); // Panel
    }

    let addInputButton = {};
    let deleteInputButton = {};
    if( param.canAddInput ) {
      addInputButton =      
      $("Button",
        { 
          row: 2, column: 0, 
          name: "DYNAMIC BUTTONS",
          visible: false,
          alignment: go.Spot.TopRight,
        },
        $(go.Shape, "PlusLine", { width: 8, height: 8 }),
          { click: addInPort.bind("TEST") }
      );
      deleteInputButton =  
      $("Button",
        { 
          row: 0, column: 0, 
          name: "DYNAMIC BUTTONS",
          visible: false,
          alignment: go.Spot.BottomRight,
        },
        $(go.Shape, "minusLine", { width: 8, height: 8 }),
        { click: deleteInPort }
      );
    }
    
    let inputPorts = {};
    if( param.hasInputs ) {
      inputPorts =
      $(go.Panel, "Vertical",
        new go.Binding("itemArray", "in"),
        {
          name: "INPORT",
          row: 1, column: (param.isPortInside? 1: 0),
          alignment: new go.Spot(0, 0.5, 0, 0),
          itemTemplate:
          $(go.Panel, "Auto",
            {
              fromSpot: go.Spot.Left, 
              toSpot: go.Spot.Left,
              fromLinkable: false,
              toLinkable: ( param.isInputLinkable !== undefined? param.isInputLinkable: true ), 
              cursor: "pointer",
              contextMenu: ( param.inputMenu? param.inputMenu: null ),
              background: "transparent", 
              stretch: go.GraphObject.Horizontal,
            },
            new go.Binding("portId", "portId"),
            $(go.Shape, "Rectangle",
              {
                figure: "RightPointSquarePort",
                stroke: "black", 
                strokeWidth: 1,
                fill: "white",
                minSize: new go.Size(20, 15),
                margin: new go.Margin(2, 0),
                // allow the user to select items -- the background color indicates whether "selected"
                click: function(e, item) {
                  // assume param.portFill means not "selected", for items
                  var oldskips = item.diagram.skipsUndoManager;
                  item.diagram.skipsUndoManager = true;
                  if (item.fill === "white") {
                    item.fill = ( param.selectFill? param.selectFill: "dodgerblue" );
                  } else {
                    item.fill = "white";
                  }
                  item.diagram.skipsUndoManager = oldskips;
                }
              }
            ),
            $(go.TextBlock,
              { 
                stretch: go.GraphObject.Horizontal,
                stroke: ( param.portStroke? param.portStroke: "Black" ),
                editable: ( param.isInputEditable !== undefined? param.isInputEditable: true ),
                isMultiline: false,
                textAlign: ( param.inputTextAlign !== undefined? param.inputTextAlign: "right" ),
                margin: 0,
                font: ( param.font? param.font: "14px sans-serif" ),
                overflow: go.TextBlock.OverflowEllipsis,
              },
              new go.Binding("text", "portId", function(v) { return v.trim(); }).makeTwoWay(function(t) { return t.trim(); })
            )
          )  // end itemTemplate
        }
      );  // end Vertical Panel for left ports
    }
    
    let addOutputButton = {};
    let deleteOutputButton = {};
    if( param.canAddOutput ) {
      addOutputButton =      
      $("Button",
        { 
          row: 0, column: 2, 
          name: "DYNAMIC BUTTONS",
          visible: false,
          alignment: go.Spot.BottomLeft,
        },
        $(go.Shape, "minusLine", { width: 8, height: 8 }),
        { click: deleteOutPort }
      );
      deleteOutputButton =
      $("Button",
        { 
          row: 2, column: 2, 
          name: "DYNAMIC BUTTONS",
          visible: false,
          alignment: go.Spot.TopLeft,
        },
        $(go.Shape, "PlusLine", { width: 8, height: 8 }),
          { click: addOutPort }
      );
    }

    let outputPorts = {};
    if( param.hasOutputs ) {
      outputPorts =
      $(go.Panel, "Vertical",
        new go.Binding("itemArray", "out"),
        {
          name: "OUTPORT",
          row: 1, column: (param.isPortInside? 1: 2),
          alignment: new go.Spot(1, 0.5, 0, 0),

          itemTemplate:
          $(go.Panel, "Auto",
            {
              fromSpot: go.Spot.Right, 
              toSpot: go.Spot.Right,
              fromLinkable: ( param.isOutputLinkable !== undefined? param.isOutputLinkable: true ),  
              toLinkable: false, 
              cursor: "pointer",
              contextMenu: ( param.outputMenu? param.outputMenu: null ),
              background: "transparent", 
              stretch: go.GraphObject.Horizontal,
           },
            new go.Binding("portId", "portId"),
            $(go.Shape, "Rectangle",
              {
                figure: "RightPointSquarePort",
                stroke: "black", 
                strokeWidth: 1,
                fill: "white",
                minSize: new go.Size(20, 15),
                margin: new go.Margin(2, 0),
                // allow the user to select items -- the background color indicates whether "selected"
                click: function(e, item) {
                  // assume param.portFill means not "selected", for items
                  var oldskips = item.diagram.skipsUndoManager;
                  item.diagram.skipsUndoManager = true;
                  if (item.fill === "white") {
                    item.fill = ( param.selectFill? param.selectFill: "dodgerblue" );
                  } else {
                    item.fill = "white";
                  }
                  item.diagram.skipsUndoManager = oldskips;
                }
              }
            ),
            $(go.TextBlock,
              { 
                stretch: go.GraphObject.Horizontal,
                stroke: ( param.portStroke? param.portStroke: "Black" ),
                editable: ( param.isOutputEditable !== undefined? param.isOutputEditable: true ),
                isMultiline: false,
                textAlign: ( param.outputTextAlign !== undefined? param.outputTextAlign: "left" ),
                margin: 0,
                font: ( param.portFont? param.portFont: "14px sans-serif" ),
                overflow: go.TextBlock.OverflowEllipsis,
              },
              new go.Binding("text", "portId", function(v) { return v.trim(); }).makeTwoWay(function(t) { return t.trim(); })
            )
          )  // end itemTemplate
        }
      );  // end Vertical Panel for right ports
    }
    
    // Node Template
    return $(go.Node, "Spot",
      {
        resizable: ( param.resizable !== undefined? param.resizable: true ),
        locationObjectName: "BODY",  
        resizeObjectName: 'BODY',
        locationSpot: go.Spot.Center,
      },
      new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, "Table",
        //---------
        // Body
        //---------
        $(go.Panel, "Auto",
          {
            row: 1, column: 1, 
            name: "BODY",
            stretch: go.GraphObject.Fill,
            minSize: ( param.minSize? param.minSize: new go.Size(NaN, 40)), 
            maxSize: ( param.maxSize? param.maxSize: new go.Size(NaN, NaN)), 
          },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          $(go.Shape,
            {
              name: "MAIN",
              figure: ( param.figure? param.figure: "rectangle" ), 
              fill: ( param.fill? param.fill: "white" ), 
              stroke: ( param.stroke? param.stroke: "black" ),
              cursor: "pointer",  // the Shape is the port, not the whole Node
              portId: ( param.portId? param.portId: "" ), 
              // allow all kinds of links from this port
              fromSpot: ( param.fromSpot? param.fromSpot: go.Spot.Bottom ),
              fromLinkable: ( param.fromLinkable !== undefined? param.fromLinkable: true ),
              fromLinkableSelfNode: ( param.fromLinkableSelfNode !== undefined? param.fromLinkableSelfNode: false ),
              fromLinkableDuplicates: ( param.fromLinkableDuplicates !== undefined? param.fromLinkableDuplicates: false ),
              fromMaxLinks: ( param.fromMaxLinks !== undefined? param.fromMaxLinks: Infinity ),
              // allow all kinds of links to this port
              toSpot: ( param.toSpot? param.toSpot: go.Spot.Top ),
              toLinkable: ( param.toLinkable !== undefined? param.toLinkable: true ),
              toLinkableSelfNode: ( param.toLinkableSelfNode !== undefined? param.toLinkableSelfNode: false ),
              toLinkableDuplicates: ( param.toLinkableDuplicates !== undefined? param.toLinkableDuplicates: false ),
              toMaxLinks: ( param.toMaxLinks !== undefined? param.toMaxLinks: Infinity ),
              },
              new go.Binding("fill", "color").makeTwoWay()
          ),
          $(go.Panel, "Table",
            {
              alignment: go.Spot.Left,
              stretch: go.GraphObject.Fill,
              margin: 5,
            },
            new go.Binding("desiredSize", "size", go.Size.parse),
            //----------
            // Buttons
            //----------
            functionButtons,
            //----------
            // Label
            //----------
            $(go.Panel, "Auto",
              { margin: 10,
                row: 0, column: 1,
                stretch: go.GraphObject.Fill,
              },
              $(go.TextBlock,
                { 
                  name: "LABEL",
                  //background: "red",
                  minSize: new go.Size(NaN, 20), 
                  text: ( param.label? param.label: "label" ),
                  stroke: ( param.labelStroke? param.labelStroke: "Black" ),
                  editable: ( param.editable !== undefined? param.editable: true ),
                  isMultiline: ( param.isMultiline !== undefined? param.isMultiline: true ),
                  textAlign: ( param.textAlign? param.textAlign: "center" ),
                  margin: ( param.margin? param.margin: 0 ),
                  font: ( param.font? param.font: "18px sans-serif" ),
                  overflow: go.TextBlock.OverflowEllipsis,
                  verticalAlignment: go.Spot.Center,
                },
                textBinding
              ), // Text Block
              //----------
              // Type
              //----------
              typeText,
              //----------
              // Tag
              //----------
              tagText
            )
          ) // Table

        ),  // end Auto Panel body
        // -----------------
        // In ports
        // -----------------
        addInputButton,
        deleteInputButton,
        inputPorts,
        // -----------------
        // Out ports
        // -----------------
        addOutputButton,
        deleteOutputButton,
        outputPorts,
        //------------------
        // Properties
        //------------------
        properties
      )
    );
  };
  var dsl_BasicNode = (param)=> {
    param = ( param? param: {} );
    param.hasTag = ( param.hasTag !== undefined? param.hasTag: true );
    param.hasType = ( param.hasType !== undefined? param.hasType: true );
    param.hasImage = ( param.hasImage !== undefined? param.hasImage: 'none' );
    param.isLinkFromPicture = ( param.isLinkFromPicture !== undefined? param.isLinkFromPicture: true );

    let textBinding = new go.Binding("text", "label").makeTwoWay();
    if( param.label && param.label.startsWith('@') ) {
      textBinding = new go.Binding("text", param.label.substring(1)).makeTwoWay();
    }    
    let tagBinding = new go.Binding("text", "tag").makeTwoWay();
    if( param.tag && param.tag.startsWith('@') ) {
      tagBinding = new go.Binding("text", param.tag.substring(1)).makeTwoWay();
    }    
    let typeBinding = new go.Binding("text", "type").makeTwoWay();
    if( param.type && param.type.startsWith('@') ) {
      typeBinding = new go.Binding("text", param.type.substring(1)).makeTwoWay();
    }    
    let menuButton = {};
    if( param.menu ) {
      menuButton = $(go.Shape,
        {
          fill: "orange", stroke: "gray", background: "transparent",
          geometryString: "F1 M0 0 M0 4h4v4h-4z M6 4h4v4h-4z M12 4h4v4h-4z M0 12",
          cursor: "context-menu",
          alignment: new go.Spot(1, 0, -10, -10),
          contextMenu: ( param.menu? param.menu: null ),
        }
      );
    }

    let tagText = {};
    if( param.hasTag ) {
      tagText = 
      $(go.TextBlock,
        {
          stretch: go.GraphObject.Horizontal, 
          height: 10, 
          font: "italic 10px sans-serif",
          stroke: 'black',
          alignment: new go.Spot(0.5, 1, 0, 2),
          alignmentFocus: go.Spot.Top,
          margin: 0,  // make some extra space for the shape around the text
          isMultiline: false,  // don't allow newlines in text
          editable: ( param.isTagEditable !== undefined? param.isTagEditable: true ),  // allow in-place editing by user
          contextMenu: ( param.tagMenu? param.tagMenu: null ),
        },
        tagBinding
      );
    }    
    
    let typeText = {};
    if( param.hasType ) {
      typeText = 
      $(go.TextBlock,
        {
          stretch: go.GraphObject.Horizontal, 
          height: 10, 
          font: "italic 10px sans-serif",
          stroke: 'black',
          //alignment: new go.Spot(0.5, 0, 0, -2),
          alignment: new go.Spot(0.5, 0),
          alignmentFocus: go.Spot.Top,
          margin: 0,  // make some extra space for the shape around the text
          isMultiline: false,  // don't allow newlines in text
          editable: ( param.isTypeEditable !== undefined? param.isTypeEditable: true ),  // allow in-place editing by user
          contextMenu: ( param.typeMenu? param.typeMenu: null ),
        },
        typeBinding
      );
    } 

    const getContentImage = ( fileURL )=> {
      let imageURL = '';
      if( fileURL ) {
        const idx = fileURL.lastIndexOf( '.' );
        if( idx ) {
          const ext = fileURL.substring( idx );
          if( ext == '.json' ) {
            // TODO: resolve the quick fix for avoiding cacheing images
            const timestamp = new Date().getTime();
            imageURL = fileURL.substring( 0, idx )+'.png?_='+timestamp;
          } 
        }
      }
      return( imageURL );
    }      

    let imageSource = {};
    switch( param.hasImage ) {
      case 'content':
        imageSource = new go.Binding( "source", "fileURL", getContentImage );
        break;
      case 'user':
        imageSource = new go.Binding( "source", "imageURL", getDefaultPicture );
        break;
    }

    let pictureExtra = {};
    let textExtra = {};
    if( param.isLinkFromPicture ) {
      pictureExtra = commonLinkProps(param);
    } else {
      textExtra = commonLinkProps(param);
    }
 
    
    let contentImage = {};
    let layout = 'Spot'; 
    let isClipping = false;
    if( param.hasImage && param.hasImage != 'none' ) {
      isClipping = true;
      layout = 'Spot';
      contentImage = 
        $(go.Panel, "Spot",
          { 
            isClipping: isClipping, 
          },
          $(go.Shape, 
            { 
              figure: ( param.figure? param.figure: "rectangle" ),
              fill: "transparent",
              stroke: "transparent",
            },
            new go.Binding("desiredSize", "size", getReducedSize)
          ),        
          $(go.Picture,
            {
              name: "PICTURE",
              margin: 2,
              imageStretch: ( param.imageStretch? param.imageStretch: go.GraphObject.UniformToFill ),
            },
            imageSource,
            new go.Binding( "desiredSize", "size", getReducedSize )
          )
        )
    }

    return $(go.Node, layout,
      { 
        resizable: ( param.resizable !== undefined? param.resizable: true ),
        locationObjectName: 'BODY',  
        resizeObjectName: 'BODY',
        //locationSpot: go.Spot.Center,
      },
      new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("layerName","layerName"),
      $(go.Panel, "Spot",
        {        
          //padding: new go.Margin(10,10,10,10),
        },
        $(go.Shape, 
          {
            minSize: ( param.minSize? param.minSize: new go.Size(40, 40) ),
            maxSize: ( param.maxSize? param.maxSize: new go.Size(NaN, NaN) ),
            //alignment: go.Spot.Center,
            //alignmentFocus: go.Spot.Center,
            figure: ( param.figure? param.figure: "rectangle" ), 
            name: "BODY",
            fill: ( param.fill? param.fill: "transparent" ),
            strokeWidth: ( param.strokeWidth? param.strokeWidth: 1 ),
            stroke: ( param.stroke? param.stroke: "Black" ),
          },
          pictureExtra,
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          new go.Binding("fill","color")
        ),
        contentImage,
        menuButton,
        $(go.TextBlock,
			textAlignment( param ),
          { 
			name: "LABEL",
            text: ( param.label? param.label: "label" ),
            stroke: ( param.labelStroke? param.labelStroke: "Black" ),
            editable: ( param.editable !== undefined? param.editable: true ),
            isMultiline: ( param.isMultiline !== undefined? param.isMultiline: true ),
            //textAlign: "right", //( param.textAlign? param.textAlign: "left" ),
            margin: ( param.margin? param.margin: 10 ),
            font: ( param.font? param.font: "18px sans-serif" ),
            overflow: go.TextBlock.OverflowEllipsis,
          },
          textExtra,
          new go.Binding("alignment","alignment",go.Spot.parse).makeTwoWay(go.Spot.stringify),
          new go.Binding("alignmentFocus","alignmentFocus",go.Spot.parse).makeTwoWay(go.Spot.stringify),
          new go.Binding("textAlign","textAlign"),
          new go.Binding("font","font"),
          textBinding
        ),
      ),

      typeText,
      tagText
    );
  };
  var dsl_Pictures1 = (param)=> {
    param = ( param? param: {} );

    let textBinding = new go.Binding("text", "label").makeTwoWay();
    if( param.label && param.label.startsWith('@') ) {
      textBinding = new go.Binding("text", param.label.substring(1)).makeTwoWay();
    }

    const link = {
      toSpot: ( param.toSpot? param.toSpot: go.Spot.Center ),
      fromSpot: ( param.fromSpot? param.fromSpot: go.Spot.Center ),
      portId: ( param.portId? param.portId: "" ), 
      cursor: "pointer",  // the Shape is the port, not the whole Node
      // allow all kinds of links from this port
      fromLinkable: ( param.fromLinkable !== undefined? param.fromLinkable: true ),
      fromLinkableSelfNode: ( param.fromLinkableSelfNode !== undefined? param.fromLinkableSelfNode: false ),
      fromLinkableDuplicates: ( param.fromLinkableDuplicates !== undefined? param.fromLinkableDuplicates: false ),
      fromMaxLinks: ( param.fromMaxLinks !== undefined? param.fromMaxLinks: Infinity ),
      // allow all kinds of links to this port
      toLinkable: ( param.toLinkable !== undefined? param.toLinkable: true ),
      toLinkableSelfNode: ( param.toLinkableSelfNode !== undefined? param.toLinkableSelfNode: false ),
      toLinkableDuplicates: ( param.toLinkableDuplicates !== undefined? param.toLinkableDuplicates: false ),
      toMaxLinks: ( param.toMaxLinks !== undefined? param.toMaxLinks: Infinity ),
    };
    let pictureExtra = {};
    let textExtra = {};
    if( param.isLinkFromPicture ) {
      pictureExtra = link;
    } else {
      textExtra = link;
    }
    const computeBackground = ( text )=> {
      return( text == ''? 'white': 'transparent' ); 
    }

    return $(go.Node, "Vertical",
      {
        resizable: ( param.resizable !== undefined? param.resizable: true ),
        resizeObjectName: "PICTURE",
      },
      new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Picture,
        Object.assign( {
          name: "PICTURE",
          margin: 2,
          background: 'white',
          imageStretch: ( param.imageStretch? param.imageStretch: go.GraphObject.Uniform ),
        }, pictureExtra),
        new go.Binding( "background", "fileURL", computeBackground ),
        new go.Binding( "source", "fileURL" ),
        new go.Binding( "desiredSize", "size", go.Size.parse ).makeTwoWay(go.Size.stringify),
      ),
      $(go.TextBlock,
        Object.assign( {
          alignment: go.Spot.Center,
          verticalAlignment: go.Spot.Center,
          alignmentFocus: go.Spot.Center,
          name: "LABEL",
          text: ( param.label? param.label: "label" ),
          stroke: ( param.labelStroke? param.labelStroke: "Black" ),
          editable: ( param.editable !== undefined? param.editable: true ),
          isMultiline: ( param.isMultiline !== undefined? param.isMultiline: true ),
          textAlign: ( param.textAlign? param.textAlign: "Left" ),
          margin: ( param.margin? param.margin: 10 ),
          font: ( param.font? param.font: "18px sans-serif" ),
          overflow: go.TextBlock.OverflowEllipsis,
        }, textExtra),
        textBinding
      )
    )
  };
  var dsl_Pictures = (param)=> {
    param = ( param? param: {} );
    param.isLinkFromPicture = ( param.isLinkFromPicture !== undefined? param.isLinkFromPicture: false );


    let textBinding = new go.Binding("text", "label").makeTwoWay();
    if( param.label && param.label.startsWith('@') ) {
      textBinding = new go.Binding("text", param.label.substring(1)).makeTwoWay();
    }

    let pictureExtra = {};
    let textExtra = {};
    if( param.isLinkFromPicture ) {
      pictureExtra = commonLinkProps(param);
    } else {
      textExtra = commonLinkProps(param);
    }

    return $(go.Node, "Vertical",
      {
        resizable: ( param.resizable !== undefined? param.resizable: true ),
        locationObjectName: "LABEL",  
        resizeObjectName: 'BODY',
        locationSpot: go.Spot.Center,
      },
      new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding( "layerName", "layerName"),
      $(go.Panel, "Spot",
        $(go.Shape, 
          Object.assign( 
            {
              minSize: ( param.minSize? param.minSize: new go.Size(80, 40) ),
              maxSize: ( param.maxSize? param.maxSize: new go.Size(NaN, NaN) ),
              alignment: go.Spot.Center,
              alignmentFocus: go.Spot.Center,
              figure: ( param.figure? param.figure: "rectangle" ), 
              name: "BODY",
              fill: ( param.fill? param.fill: "transparent" ),
              strokeWidth: ( param.strokeWidth? param.strokeWidth: 0 ),
              stroke: ( param.stroke? param.stroke: "Black" ),
            },
            pictureExtra
          ),
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          new go.Binding("fill","color")
        ),
        $(go.Panel, "Spot",
          { 
            isClipping: true, 
          },
          $(go.Shape, 
            { 
              figure: ( param.figure? param.figure: "rectangle" ), 
            },
            new go.Binding( "desiredSize", "size", getReducedSize )
          ),
          $(go.Picture,
            {
              name: "PICTURE",
              margin: 2,
              imageStretch: ( param.imageStretch? param.imageStretch: go.GraphObject.UniformToFill ),
            }, 
            new go.Binding( "source", "fileURL", getDefaultPicture ),
            new go.Binding( "desiredSize", "size", getReducedSize )
          )
        )
      ),
      $(go.TextBlock,
        Object.assign( 
          {
            alignment: go.Spot.Center,
            verticalAlignment: go.Spot.Center,
            alignmentFocus: go.Spot.Center,
            name: "LABEL",
            text: ( param.label? param.label: "label" ),
            stroke: ( param.labelStroke? param.labelStroke: "Black" ),
            editable: ( param.editable !== undefined? param.editable: true ),
            isMultiline: ( param.isMultiline !== undefined? param.isMultiline: true ),
            textAlign: ( param.textAlign? param.textAlign: "Left" ),
            margin: ( param.margin? param.margin: 10 ),
            font: ( param.font? param.font: "18px sans-serif" ),
            overflow: go.TextBlock.OverflowEllipsis,
          }, 
          textExtra
        ),
        textBinding
      )
    )
  };
 
  //-----------------------
  // Define link templates
  //-----------------------
  
  var dsl_BasicLink = (param)=> {
    let strokeBinding = new go.Binding("stroke", "color");
    let fillBinding = new go.Binding("fill", "color");
    /*if(param.stroke && param.stroke.startsWith('@fromNodeColor')) {
      strokeBinding = new go.Binding("stroke", "fromNode", function(n) { return n.data.color; }).ofObject();
      strokeBinding = new go.Binding("fill", "fromNode", function(n) { return n.data.color }).ofObject();
      param.stroke = "black";
    }*/
    return $(go.Link,
      {
        toShortLength:  ( param.toShortLength? param.toShortLength: 0 ),
        fromShortLength:  ( param.fromShortLength? param.fromShortLength: 0 ),
        reshapable: ( param.reshapable !== undefined? param.reshapable: true ),
        resegmentable: ( param.resegmentable !== undefined? param.resegmentable: true ),
        relinkableFrom: ( param.relinkableFrom !== undefined? param.relinkableFrom: true ),
        relinkableTo: ( param.relinkableTo !== undefined? param.relinkableTo: true ),
        curve: ( param.jump? param.jump: go.Link.JumpGap ), //go.Link.JumpOver
      },
      new go.Binding("points", "points").makeTwoWay(),
      $(go.Shape,
       { 
          stroke: ( param.stroke? param.stroke: "Black" ),
          strokeWidth: ( param.strokeWidth? param.strokeWidth: 2 ),
          strokeDashArray: ( param.strokeDashArray? param.strokeDashArray: [] ),
        },
        new go.Binding("stroke", "color"),
      ),
      $(go.Shape,
        { 
          //fromArrow: ( param.fromArrow? param.fromArrow: "OpenTriangle" ),
          toArrow: ( param.toArrow? param.toArrow: "" ),
          fill: ( param.stroke? param.stroke: "Black" ),
          stroke: ( param.stroke? param.stroke: "Black" ),
          scale: ( param.toScale? param.toScale: 1 ),
        },
        new go.Binding("stroke", "color"),
        new go.Binding("fill", "color")
      ),
      $(go.Shape,
        { 
          fromArrow: ( param.fromArrow? param.fromArrow: "" ),
          //toArrow: ( param.toArrow? param.toArrow: "OpenTriangle" ),
          fill: ( param.stroke? param.stroke: "Black" ),
          stroke: ( param.stroke? param.stroke: "Black" ),
          scale: ( param.fromScale? param.fromScale: 1 ),
        },
        new go.Binding("stroke", "color"),
        new go.Binding("fill", "color")
      )
    );
  };


  //-----------------------
  // Define event handler
  //-----------------------
  function findAllObject(node,name) {
    const result = new go.Set();
    const objList = node.elements;
    if(objList.count > 0) {
      objList.each(
        function(v) {
          if( v ) {
            //console.log(v.constructor.className+' '+v.name)
            switch( v.constructor.className ) {
            case 'Panel':
              if( v.name == name ) {
                result.add(v);
              }
              r = findAllObject(v,name);
              if( r.constructor.className == 'Set') {
                result.addAll(r);
              } else {
                result.add(r);
              }
              break;
            default:
              if( v.name == name ) {
                result.add(v);
              }
              break;
            }
          }
        }
      );
    }
    return( result );
  }
  function turnOnVisibitityOfButtons(evt,diagram) {
    diagram.startTransaction( "turn on visibility of dynamic buttons" );
    const selection = evt.subject;
    // Loop over selected objects
    selection.each(
      function(value) {
        const data = value.data;
        if( data && (data.rows || data.in || data.out) ) {
          const objList = findAllObject(value,"DYNAMIC BUTTONS");
          objList.each(
            function(v) {
              v.visible = ( value.isSelected? true: false);
            }
          );
        }
      }
    );
    diagram.commitTransaction( "turn on visibility of dynamic buttons" );
  };
  function turnOffVisibitityOfButtons(evt,diagram) {
    diagram.startTransaction( "turn off visibility of dynamic buttons" );
    const selection = evt.subject;
    // Loop over selected objects
    selection.each(
      function(value) {
        const data = value.data;
        if( data && (data.rows || data.in || data.out) ) {
          const objList = findAllObject(value,"DYNAMIC BUTTONS");
          objList.each(
            function(v) {
              v.visible = ( value.isSelected? false: true);
            }
          );
        }
      }
    );
    diagram.commitTransaction( "turn off visibility of dynamic buttons" );
  };

  
