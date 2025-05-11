import pandas as pd

df = pd.read_csv('./uri_trenchnno_year.csv',on_bad_lines='skip')
df = df.dropna(how='any')
df_filtered = df[df['Trench and Trench Number'] != 'Unrecorded']

df_filtered['Year'] = pd.to_numeric(df_filtered['Year'], errors='coerce')
df_filtered = df_filtered.dropna(subset=['Year'])

df_filtered['Author'] = 'Poggio Civitate' 

df_filtered.to_json('areaAndNumber_year_uri.json', orient='records', lines=False)