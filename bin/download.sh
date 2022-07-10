#!/usr/bin/env bash

rm -f 'All Domain Values.xml'
STATUS=$(curl https://cdx2.epa.gov/wqx/download/DomainValues/All.zip -w %{http_code} -H "Accept: application/x-zip-compressed" -H "Accept-Encoding: br, gzip, deflate"  -H "Accept-Language: en" -H "User-Agent: DataStreamBot" -o All.zip)
if [ "${STATUS}" != "200" ]; then
  curl https://cdx.epa.gov/wqx/download/DomainValues/All.zip -H "Accept: application/x-zip-compressed" -H "Accept-Encoding: br, gzip, deflate"  -H "Accept-Language: en" -H "User-Agent: DataStreamBot" -o All.zip
fi
unzip All.zip
rm All.zip