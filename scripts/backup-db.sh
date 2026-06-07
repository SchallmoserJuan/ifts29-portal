#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="backup"
DB_FILE="ifts29.db"
TIMESTAMP=$(date +%Y-%m-%d)
BACKUP_FILE="$BACKUP_DIR/${DB_FILE%.db}-$TIMESTAMP.db"

mkdir -p "$BACKUP_DIR"

if [ ! -f "$DB_FILE" ]; then
  echo "Error: $DB_FILE no encontrado. Ejecutá este script desde la raíz del proyecto."
  exit 1
fi

cp "$DB_FILE" "$BACKUP_FILE"
SIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')

echo "Backup creado: $BACKUP_FILE ($SIZE)"
