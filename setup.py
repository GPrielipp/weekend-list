#!/usr/bin/env python3

import csv, sys, os, sqlite3
from datetime import datetime

# convert a string of permissions into an bitfield representation
def parse_permissions(permissions):
    conversions = {
        'WEEKEND':  0b000001,
        'CDO':      0b000010,
        'SQD':      0b000100,
        'PLT':      0b001000,
        'COC':      0b010000,
        'COVIEW':   0b100000,
    }

    value = 0

    for permission in permissions.split(","):
        permission = permission.strip()
        
        try:
            value |= conversions[permission]
        except KeyError as e:
            print(f'[parse_permissions: KeyError] {e}', file=sys.stderr)
        except Exception as e:
            print(f'[parse_permissions: ERROR] {e}', file=sys.stderr)

    return value


# parse the csv file
def parse_csv(fn):
    data = []
    headers = None
    year = datetime.now().year

    with open(fn, 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            # only need the first 10 columns
            row = row[:10:]
            
            if headers is None:
                headers = row
            else:
                entry = {x: y for x,y in zip(headers, row)}

                if int(entry['ALPHA']) >= year:
                    entry['PERMISSIONS'] = parse_permissions(entry['PERMISSIONS'] + ", CDO")
                else:
                    entry['PERMISSIONS'] = parse_permissions(entry['PERMISSIONS'])

                data.append(entry)

    return data

# take the formatted data and put it into a database
def create_database(data):
    # now, parsing all of the data, then writing it is rather memory inefficient...
    # whatever
    # connect to the database (creates it if it doesn't exist)
    with (conn := sqlite3.connect('./db/weekend-list.db')):
        # get the cursor to write to the database
        cursor = conn.cursor()

        # create the table
        print('''CREATE TABLE users (
    LAST_NAME CHAR(30) NOT NULL,
    FIRST_NAME CHAR(30),
    ALPHA INT NOT NULL,
    PHONE_NUMBER INT,
    PERMISSIONS INT,
    COMPANY INT,
    PLATOON INT,
    SQUAD INT,
    WEEKEND_COUNT INT,
    SPIRIT_PASSES INT,
    PRIMARY KEY (ALPHA)
);''')
        cursor.execute('''CREATE TABLE users (
                        LAST_NAME CHAR(30) NOT NULL,
                        FIRST_NAME CHAR(30),
                        ALPHA INT NOT NULL,
                        PHONE_NUMBER INT,
                        PERMISSIONS INT,
                        COMPANY INT,
                        PLATOON INT,
                        SQUAD INT,
                        WEEKEND_COUNT INT,
                        SPIRIT_PASSES INT,
                        PRIMARY KEY (ALPHA)
                       );''')

        # input all of the data
        cmd = lambda row: f'''INSERT INTO users VALUES ('{row['LAST']}', '{row['FIRST']}', '{row['ALPHA']}', '{row['NUMBER']}', '{row['PERMISSIONS']}', '{row['COMPANY']}', '{row['PLATOON']}', '{row['SQUAD']}', '{row['WEEKEND COUNT']}', '{row['SPIRIT PASSES']}');'''
        for row in data:
            try:
                print(cmd(row))
                cursor.execute( cmd(row) )
            except Exception as e:
                print(f'[create_database: ERROR] {e}', file=sys.stderr)

        # save the changes
        conn.commit()

    print('[create_database] database initialized')

if __name__ == '__main__':
    # make sure the csv file exists
    csvpath = f'{os.curdir}/company-roster.csv'
    if not os.path.exists(csvpath):
        print(f'[ERROR] file \'{csvpath}\' does not exist', file=sys.stderr)
        sys.exit(1)
    
    data = parse_csv(csvpath)

    # create the database
    create_database(data)
        