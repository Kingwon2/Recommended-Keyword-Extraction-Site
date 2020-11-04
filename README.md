추천 키워드 추출 웹

updateAmt.js : 몽고DB속 데이터에 접근, 총 검색량 값을 구해서 삽입

updateBlogTotal.js : 몽고DB속 데이터에 갱신

searchApi.js : 검색블로그API를 이용해서 키워드에 대한 상위블로그, 블로그 총 발생량등을 JSON형식으로 반환

naverApi.js : 광고API를 이용해서 연관검색어, 총 검색량을 JSON형식으로 반환

save,js : 통합검색어 API를 이용해서 상대적인 통계값을 JSON형식으로 반환 

sync-request, MongoClient, node-cron, 네이버 광고API, 통합검색어 API, 검색-블로그API, 네이버 데이터랩을 참고 및 응용해서 모듈 개발 진행.

--------------------------------------------------
파이썬의 경우 beautifulSoup, requests 사용 

Crawling.py : 급상승 검색어 추출, 몽고DB에 저장
