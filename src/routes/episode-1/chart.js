import { ClassDef } from "../../lib/mermaid"
import { NodeShape } from "../../lib/mermaid/chart-node";

const baseClass = new ClassDef("base").fill("black").color("white");

export const options = {
  Introduction:
  {
    class: ClassDef.from(baseClass).stroke("green"),
    shape: "pill"
  },
  Core: {
    class: ClassDef.from(baseClass).stroke("blue"),
    shape: "default"
  },
  Alternate: {
    class: ClassDef.from(baseClass).stroke("yellow"),
    shape: "hex"
  },
  "Antagonist Reaction": {
    class: new ClassDef("reaction").fill("red"),
    shape: "trapezoid"
  },
  final:
  {
    class: ClassDef.from(baseClass)
      .stroke("red"),
    shape: "pill"
  }
}

export const stately = {
  id: "Episode 1",
  tags: ["link:dotted", "curve:cardinal", "var:edgeLabelBackground=#000:textColor=#FFF"],
  initial: "Scene 1",
  states: {
    "Scene 1": {
      tags: "Introduction",
      on: {
        "Event 1": {
          target: "Scene 2",
        },
        "Event 2": {
          target: "Scene 3",
        },
      },
    },
    "Scene 2": {
      tags: "Core",
      on: {
        "Event 1": {
          target: "Scene 3",
        },
        "Event 2": {
          target: "Scene 4",
        },
        "Event 3": {
          target: "New state 3",
        },
        "Event 4": {
          target: "New state 4",
        },
      },
    },
    "Scene 3": {
      tags: "Core",
      on: {
        "Event 1": {
          target: "Scene 2",
        },
        "Event name": {
          target: "Scene 4",
        },
        "Event 3": {
          target: "Scene 6",
          description: "Make friends with the guy",
        },
      },
    },
    "Scene 4": {
      tags: "Core",
      on: {
        "Event 1": {
          target: "Scene 5",
        },
      },
    },
    "New state 3": {
      tags: "Core",
      on: {
        "Event 1": {
          target: "New state 1",
        },
      },
    },
    "New state 4": {
      tags: "Antagonist Reaction",
      on: {
        "Event 1": {
          target: "New state 3",
        },
      },
    },
    "Scene 6": {
      tags: "Alternate",
      on: {
        "Event 2": {
          target: "New state 1",
        },
      },
    },
    "Scene 5": {
      type: "final",
    },
    "New state 1": {
      tags: "Alternate",
      on: {
        "Event 1": {
          target: "Scene 4",
        },
        "Event 2": {
          target: "New state 2",
        },
      },
    },
    "New state 2": {
      tags: "Core",
      on: {
        "Event 1": {
          target: "Scene 2",
        },
      },
    },
  },
}