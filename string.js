/**
 * 字符串匹配
 * 如果在一个字符串A中查找字符串B，那么A就是主串，B是模式串。
 */

/**
 * BF算法：在主串中，检查起始位置分别是0、1、2...n-m,且长度为m的 n-m+1个子串是否有与模式串匹配的字符串。
 * (因为到了n-m的时候还没有查找到，那就是没有这个模式串了)
 * 思想：从string的一个字符开始i=0，判断是否与target的第一个一致j=0，如果是ij都+1.对后续的字符进行判断
 * 如果不是则退出此次循环，从i=1,j=0开始判断，以此类推
 * 如果查找到了就返回成功（i当前值）否则返回-1
 */
 function searchBF(string,target){
    if(target == '') return 0
    let i = 0,flag = false;
    for(i = 0;i<string.length;i++){
        let j = 0;
        while(j<target.length){
            if(string[i+j] == target[j]){
                flag = true;
                j++;
                if(j==target.length){
                    return i;
                }
                if(i == string.length){
                    return -1;
                }
            }else{
                flag = false;
                break;
            }
        }
    }
    return -1;
}
/**
 * 
 1455. 检查单词是否为句中其他单词的前缀
 https://leetcode-cn.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/
 */
 var isPrefixOfWord = function(sentence, searchWord) {
    sentence = sentence.split(' ');
    for(let i=0;i<sentence.length;i++){
        let word = sentence[i];
        let flag = isSearchWord(word,searchWord);
        if(flag!= -1){
            return i+1;
        }
    }
    return -1;
};
function isSearchWord(word,target){
    let i =0;
    for(i=0;i<word.length;){
        let j = 0;
        while(j<target.length){
            if(word[i] == target[j]){
                i++;
                j++;
                if(j == target.length){
                    if(i==target.length){
                        return i;
                    }else{
                        return -1;
                    }
                }
                if(i == word.length){
                    return -1;
                }
            }else{
                i = i+target.length;
                break;
            }
        }
    }
    return -1;
}

/**
 * 
 *  28. 实现 strStr()
 *  https://leetcode-cn.com/problems/implement-strstr/
 */

 var strStr = function(string, target) {
    if(target.length == 0) return 0;
    let i = 0,flag = false;
    for(i = 0;i<string.length;i++){
        let j = 0;
        while(j<target.length){
            if(string[i+j] == target[j]){
                flag = true;
                j++;
                if(j==target.length){
                    return i;
                }
                if(i == string.length){
                    return -1;
                }
            }else{
                flag = false;
                break;
            }
        }
    }
    return -1;
};

/**
 * RK算法
 * 通过哈希算法对主串中的n-m+1个子串分别求哈希值，然后逐个与模式串的哈希值比较大小。
 * 如果某个子串的哈希值与模式串相等，那就说明对应的子串和模式串匹配了。
 * 
 * 
 * 那么，如何提高哈希算法计算子串哈希值的效率呢？
 * 
 * 假设我们搜索的模式串和主串都是一些英文字母。
 * 首先我们把a-z这26个小写字母用一个二十六进制来表示 ：a=0,z=25，以此类推。
 * 比如 dbc 这个字符串就等于 hash(dbc) 3*26 *26 + 1*26 + 2
 * 
 * 然后我们为了方便计算，先把0-m-1个26的幂次方计算下来
 * 
 * 26^0 26^1 26^2 ...26^m-1
 * 
 * 
 */
function searchRK(string,target){
    let n = string.length,m = target.length,index = 0,hashObj = {};
    let miArray = [];
    let alphabet = {
        'a':0,
        'b':1,
        'c':2,
        'd':3,
        'e':4,
        'f':5,
        'g':6,
        'h':7,
        'i':8,
        'j':9,
        'k':10,
        'l':11,
        'm':12,
        'n':13,
        'o':14,
        'p':15,
        'q':16,
        'r':17,
        's':18,
        't':19,
        'u':20,
        'v':21,
        'w':22,
        'x':23,
        'y':24,
        'z':25

    }
    for(let i = 0;i<m;i++){//为了方便计算，先计算各个幂次方存储起来
        miArray.push(Math.pow(26,i))
    }
    while(index<n){
        let str = string.substr(index,m);
        let  hashString = hash(str,miArray,alphabet);
        hashObj[hashString] = str;
        index = index+m;
    }
    let targetHash = hash(target,miArray,alphabet);
    if(hashObj[targetHash]){
        if(target == hashObj[targetHash]){
            return true
        }
    }
    return false;
}
function hash(string,miArray,alphabet){
    //计算哈希值
    let m = string.length,value = 0;
    for(let i = 0;i<m;i++){
        value += miArray[m-i-1]*(alphabet[string[i]]-alphabet['a'])
    }
    return value;
}

/**
 * BM算法
 * 也是一个一个的进行对比，只是当模式串与主串进行匹配的过程中，当模式串与主串的某个字符不匹配的时候，
 * 跳过这个不匹配的情况，将模式串往后多滑动几位。
 * BM算法包括 坏字符规则和好后缀规则。
 * 
 * 1、坏字符规则：
 * BM算法的匹配规则是按照模式串的下标，从大到小倒着匹配，也就是从右到左进行匹配。
 * 从模式串的末尾往前倒着匹配，当发现某个字符（主串中的字符）不匹配的时候，就把这个不匹配的字符叫做“坏字符”。
 * 然后拿“坏字符”在模式串中进行查找，发现模式串中不存在这个“坏字符”，于是直接把模式串往后滑动模式串的长度位。
 * 然后再从模式串的末尾字符开始比较。
 * 
 * 当发生不匹配的时候，就把“坏字符”对应模式串中的字符下标几位si，
 * 如果坏字符在模式串中存在，就把坏字符在模式串中的下标记为xi。
 * 如果不存在就把xi=-1.
 * 那么模式串往后移动的位数就等于si-xi.
 * 
 * 如果当坏字符在模式串中多处出现，那么xi的下标，选择最靠后那一个，这样就不会让模式串滑动太多，导致前面的没有匹配上。
 * 
 * 2、好后缀规则
 * 当从后往前进行匹配的时候，发现后面的都已经匹配了，但是前面有字符不匹配。
 * 就把这些已经匹配过的字符叫做好后缀（主串中的字符），记为u。
 * 然后拿u在模式串中进行查找，如果找到了另一个和u相同的子串v，就把模式串滑动到子串v与主串中u对齐的位置。
 * 如果在模式串中找不到另一个等于u的子串，
 * 
 * a.如果一步步的往后移动模式串的时候，主串中的u与模式串有重合，那肯定就无法完全匹配
 * （为什么得出这样的结论呢？）
 * 
 * b.但是当模式串滑动到前缀与主串中u的后缀有部分重合的时候，并且重合的部分相等的时候，就有可能会存在完全匹配的情况。
 * 
 * 所以，针对这种情况，我们不仅要看好后缀在模式串中是否有另一个匹配的子串，我们还要考察好后缀的后缀子串汇总，是否存在跟模式串的前缀子串匹配的。
 * 比如abc的后缀子串是c,bc。abc的前缀子串是a,ab。
 * 从好后缀的后缀子串中，找出一个最长的并且跟模式串的前缀子串匹配的，假设是v，然后将模式串移动到v的位置中。
 * 
 * 
 * 
 * 
 * 先分别计算好坏字符和好后缀的滑动次数，然后取两个数中最大的，作为模式串往后滑动的位数。
 */

/**
 * 坏字符规则的实现
 * 思路：使用散列表来存储模式串中各个字符在模式串中的下标。
 * 首先使用一个256大小的数组记录每个字符的位置，下标对应字符的accll码，而存储的值就是字符在模式串中的位置
 */
function generateHashBC(target){
    //根据模式串的字符 生成一个散列表
    let hashArray = new Array(256).fill(-1);
    for(let i = 0;i<target.length;i++){
        let ascii = target[i].charCodeAt();
        hashArray[ascii] = i;
    }
    return hashArray;
}
function badBM(string,target){
    let hashBC = generateHashBC(target);//生成模式串的各个哈希表
    let i = 0,n = string.length;m = target.length;
    while(i<=n-m){
        let j;
        for(j = m-1;j>=0;j--){
            //从后往前开始匹配
            if(string[i+j] != target[j]){
                //遇到不匹配的 退出此处循环
                break;
            }
        }
        if(j<0){
            return i;//匹配成功了。
        }
        let index = string[i+j].charCodeAt()
        i = i + (j - hashBC[index]);
    }
    return -1;
}