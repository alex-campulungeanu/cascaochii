#!/bin/bash

# TODO: this needs adaption

set -e

OPTIND=1

migration_name=""
check_dry_run=""
migrations_args=""

# functions 

usage_message="Usage: $0 [-n <migration_name>] [-d <for dry run>]"

usage() {
    echo "$usage_message" 1>&2; exit 1; 
}

Help() { 
    # Display Help
    echo "Script to generate django migrations."
    echo
    echo "Syntax: Usage: $usage_message"
    echo "options:"
    echo "  -h     Print this Help."
    echo "  -n     Name of the script."
    echo "  -d     Run migration with --dry-run (it's just a preview, no changes  are made on DB)."
    echo
    1>&2; exit 1; 
}

run_migration() {
    if [ -z "$1" ]; then
        echo "You shouldn't arrive here, boy !"
    else
        python cascaochii/manage.py makemigrations $1
    fi
}

# [ $# -eq 0 ] && usage

while getopts ":h n: :d" opt; do
    case "${opt}" in
        n) 
            migration_name=$OPTARG
            migrations_args="--name $migration_name"
            ;;
        d) 
            check_dry_run="yes"
            migrations_args="--dry-run"
            ;;
        h) # Display help.
            Help
            ;;
        \?) # incorrect option
            echo "Error: Invalid option"
            usage
            ;;
        *)
            usage
            ;;
    esac
done

if [ $OPTIND -eq 1 ]; then
     echo "No options were passed"; 
     usage
fi

shift $((OPTIND-1))

# if [ -z "${migration_name}" ] ; then
#     while true; do
#         read -p "You didn't provide any name for migration, a default one will be used, are you sure [Y/N]?" yn
#         echo
#         case $yn in
#             [Yy]* ) 
#                     break
#                     ;;
#             [Nn]* ) 
#                     read -p "Provide a name for migration: " new_name
#                     migration_name=$new_name
#                     break 
#                     ;;
#             * ) echo "Please answer yes or no.";;
#         esac
#     done
# fi

run_migration "${migrations_args}"