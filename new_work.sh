#!/bin/zsh

WORKS_DIR="./static_media/works"

if [[ -z "$1" ]]; then
    echo "usage: $0 <name of new work file>"
    exit 1
fi

echo "---
title: \"\"
author: \"Gaelan McMillan\"
excerpt: \"\"
date: \"$(date +%F)\"
tags: []
languages: []
gitlink: \"\"
body: |
---" > "$WORKS_DIR/$1.mdx"
