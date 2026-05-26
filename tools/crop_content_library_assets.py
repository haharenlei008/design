#!/usr/bin/env python3
"""Crop content-library prototype assets from the supplied design PNG."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = Path("/Users/machong/Downloads/ChatGPT Image 2026年5月26日 15_09_52.png")
OUTPUT_DIR = ROOT / "assets" / "images" / "content-library"
MANIFEST_PATH = ROOT / "assets" / "manifest.json"


CROPS = [
    {
        "name": "little-mermaid-cover.png",
        "crop": {"x": 32, "y": 1300, "w": 255, "h": 226},
        "usage": "内容库首屏、列表和详情中的小美人鱼封面",
        "notes": "从参考设计图裁切，保留原图圆角和局部背景，建议后续替换为正式封面图。",
    },
    {
        "name": "goodnight-bear-cover.png",
        "crop": {"x": 488, "y": 248, "w": 170, "h": 130},
        "usage": "内容库推荐区和列表中的晚安小熊封面",
        "notes": "从参考设计图裁切，建议后续替换为正式封面图。",
    },
    {
        "name": "number-song-cover.png",
        "crop": {"x": 47, "y": 984, "w": 171, "h": 132},
        "usage": "内容库列表中的数字歌封面",
        "notes": "从参考设计图裁切，建议后续替换为正式封面图。",
    },
    {
        "name": "color-game-cover.png",
        "crop": {"x": 47, "y": 1130, "w": 171, "h": 132},
        "usage": "内容库列表中的一起认识颜色封面",
        "notes": "从参考设计图裁切，建议后续替换为正式封面图。",
    },
    {
        "name": "child-avatar.png",
        "crop": {"x": 838, "y": 20, "w": 76, "h": 76},
        "usage": "内容库页面右上角儿童头像",
        "notes": "从参考设计图裁切，保留头像金色描边，建议后续替换为账户头像素材。",
    },
]


def build_manifest_entry(item: dict[str, object], source: Path) -> dict[str, object]:
    name = str(item["name"])
    return {
        "name": name,
        "path": f"assets/images/content-library/{name}",
        "type": "image",
        "source": "cropped-from-design",
        "usage": item["usage"],
        "replaceable": True,
        "status": "ready",
        "notes": item["notes"],
        "crop": item["crop"],
        "sourceFile": str(source),
    }


def main() -> int:
    source = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else DEFAULT_SOURCE
    if not source.exists():
        print(f"Source image not found: {source}", file=sys.stderr)
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)

    image = Image.open(source).convert("RGB")
    manifest = []

    for item in CROPS:
        crop = item["crop"]
        box = (
            int(crop["x"]),
            int(crop["y"]),
            int(crop["x"]) + int(crop["w"]),
            int(crop["y"]) + int(crop["h"]),
        )
        output_path = OUTPUT_DIR / str(item["name"])
        image.crop(box).save(output_path)
        manifest.append(build_manifest_entry(item, source))

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Cropped {len(manifest)} assets into {OUTPUT_DIR}")
    print(f"Wrote manifest: {MANIFEST_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
