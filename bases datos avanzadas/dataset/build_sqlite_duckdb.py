import sqlite3
import pandas as pd
import glob, os

db_path = 'dataset/empresa_cun.db'
if os.path.exists(db_path):
    os.remove(db_path)

conn = sqlite3.connect(db_path)

for csv_file in sorted(glob.glob('dataset/*.csv')):
    table_name = os.path.splitext(os.path.basename(csv_file))[0]
    df = pd.read_csv(csv_file)
    df.to_sql(table_name, conn, if_exists='replace', index=False)
    print(f"Tabla '{table_name}' cargada en SQLite/DuckDB con {len(df)} filas.")

conn.close()
print("SUCCESS: Base de datos SQLite/DuckDB local 'dataset/empresa_cun.db' construida.")
