
# 

cd /content

echo "Installing konlpy....."
! pip3 install konlpy
echo "Done"


echo "Installing mecab-0.996-ko-0.9.2.tar.gz....."

echo "Downloading mecab-0.996-ko-0.9.2.tar.gz......."
echo "from https://bitbucket.org/eunjeon/mecab-ko/downloads/mecab-0.996-ko-0.9.2.tar.gz"
! wget https://bitbucket.org/eunjeon/mecab-ko/downloads/mecab-0.996-ko-0.9.2.tar.gz 
echo "Done"

echo "Unpacking mecab-0.996-ko-0.9.2.tar.gz......."
! tar xvfz mecab-0.996-ko-0.9.2.tar.gz > /dev/null 2>&1 
echo "Done"

echo "Change Directory to mecab-0.996-ko-0.9.2......."
cd mecab-0.996-ko-0.9.2/

echo "installing mecab-0.996-ko-0.9.2.tar.gz........"
echo 'configure'
! ./configure > /dev/null 2>&1
echo 'make'
! make > /dev/null 2>&1
echo 'make check'
! make check > /dev/null 2>&1
echo 'make install'
! make install > /dev/null 2>&1

echo 'ldconfig'
! ldconfig > /dev/null 2>&1
echo "Done"

echo "Change Directory to /content"
cd ../

echo "Downloading mecab-ko-dic-2.1.1-20180720.tar.gz......."
echo "from https://bitbucket.org/eunjeon/mecab-ko-dic/downloads/mecab-ko-dic-2.1.1-20180720.tar.gz"
! wget https://bitbucket.org/eunjeon/mecab-ko-dic/downloads/mecab-ko-dic-2.1.1-20180720.tar.gz
echo "Done"
 
echo "Unpacking  mecab-ko-dic-2.1.1-20180720.tar.gz......."
! tar xvfz mecab-ko-dic-2.1.1-20180720.tar.gz > /dev/null 2>&1
echo "Done"

echo "Change Directory to mecab-ko-dic-2.1.1-20180720"
cd mecab-ko-dic-2.1.1-20180720/
echo "Done"

echo "installing........"
echo 'configure'
! ./configure > /dev/null 2>&1
echo 'make'
! make > /dev/null 2>&1
echo 'make install'
! make install > /dev/null 2>&1

echo 'apt-get update'
! apt-get update > /dev/null 2>&1
echo 'apt-get upgrade'
! apt-get upgrade > /dev/null 2>&1
echo 'apt install curl'
! apt install curl > /dev/null 2>&1
echo 'apt install git'
! apt install git > /dev/null 2>&1
echo 'bash <(curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)'
! bash <(curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)  > /dev/null 2>&1
echo "Done"

echo 'wiki dump download'
! wget https://dumps.wikimedia.org/kowiki/latest/kowiki-latest-pages-articles.xml.bz2
echo 'parsing wiki dump'
! python -m wikiextractor.WikiExtractor kowiki-latest-pages-articles.xml.bz2
echo "Successfully Installed"
