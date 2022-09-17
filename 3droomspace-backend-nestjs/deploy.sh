#!/bin/bash
V=$(grep -Po "(?<=setVersion\(').*?(?='\))" src/main.ts)
echo "Last Version: $V"
FIRST=$(echo -n "$V" | cut -d "." -f 1)
SECOND=$(echo -n "$V" | cut -d "." -f 2)
THIRD=$(echo -n "$V" | cut -d "." -f 3)
if [ -z "$FIRST" ]; then
  FIRST=0
fi
if [ -z "$SECOND" ]; then
  SECOND=0
fi
if [ -z "$THIRD" ]; then
  THIRD=0
fi

THIRD=$((THIRD + 1))
if [ "$THIRD" -ge 100 ]; then
		THIRD="0"
		SECOND=$(("$SECOND" + 1))
		if [ "$SECOND" -ge 10 ]; then
        		SECOND="0"
			FIRST=$(("$FIRST" + 1))
		fi
fi

V="$FIRST"."$SECOND"."$THIRD"
echo "New Version: $V"
npm run prebuild
sed -i -E 's/"version": "(.*)"/"version": "'$V'"/' package.json
sed -i -E "s/\.setVersion\('(.*)'\)/.setVersion('"$V"')/" src/main.ts
docker build --no-cache -t 3droomspace/backend:latest .
docker tag 3droomspace/backend:latest gcr.io/composed-apogee-254606/backend-server-image:v$V
docker push gcr.io/composed-apogee-254606/backend-server-image:v$V
gcloud container clusters get-credentials threedrs-2020-staging --zone us-central1-c --project composed-apogee-254606
kubectl set image deployment/threedrs-backend-staging threedrs-backend-staging=gcr.io/composed-apogee-254606/backend-server-image:v$V
