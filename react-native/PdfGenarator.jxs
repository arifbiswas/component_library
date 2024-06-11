import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButton from '../components/BackButton';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const InvoiceScreen = ({route}) => {
  const RItem = route?.params;
  console.log(Object?.keys(RItem));

  const dynamicPart =
    RItem &&
    Object?.keys(RItem)
      ?.map(con =>
        con === 'images'
          ? `
        <div style="display:flex; justify-content: space-between; align-items: center;">
        <h3 style="color:rgb(96, 96, 96);">${con}</h3>
       <div>
        ${RItem[con]?.map(
          img => `
         <img style="width: 80px; height: 80px;border-radius:5px;" src="${img.uri}" alt="image">  
         `,
        )}
       </div>
         </div>
        `
          : `
      <div style="display:flex; justify-content: space-between; align-items: center;">
      <h3 style="color:rgb(96, 96, 96);">${con}</h3>
      <p style="color: gray;">${RItem[con]}</p>
    </div>`,
      )
      ?.join(' ');

  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="padding  : 5;">
    <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px gray solid;">
       <div style="">
        <h1 style="text-align: left;">Invoice</h1>
        <p style="color: gray;">invoice#501</p>
        <p  style="color: gray;">May,6,2021</p>
        <p  style="color: gray;">Billed TO : Deby Hana</p>
       </div>
       <div>
        <img style="width: 100px; height: 100px;" src="https://s3-alpha-sig.figma.com/img/874c/92d3/4e40566612eb250ebca2fbb4be6a9902?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qJ0E4K0VRt1e4iyOdmGBbaiyi8TMDvkWLwQEsy6-wHl2laM~aCSJsvnW8cY-kTcDDjwqe760zWEaV7Oc~NJ4vvw1eTvpH1k4RlBWptg2H7g0H~lFWS8nQT8qEjQ2CnXaKpIOH4NxQ5i8fsP~OJ42VWv4IOXeEtYdgsVugLs9fSPg2Nnzdh~2uwMjtQs7zHfVwsQLhTTPiyuNrKIDXty7Q3weO6Lm3UrCAuIjlGGUvNh0Mo-Q3MniVY0A6c4Lt-1u7dgIm8f5n-YPI3cN~HP8xkLgkZKZnCodY83tPYVt6NkPZws3DdXob0ttuO3IVG9rSxpMYpw8V6LWU21zDMrWcg__" alt="image">
       </div>
    </header>
   <main style="background-color:'white'; color : 'white';">
    ${dynamicPart}</main>
</body>
</html>
`;

  const createPDF = async () => {
    try {
      let PDFOptions = {
        html: htmlContent,
        fileName: 'invoice',
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      alert(file.filePath);
    } catch (error) {
      console.log('Failed to generate pdf', error.message);
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <BackButton title={'Invoice'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: '4%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                lineHeight: 21,
                color: '#0A0A09',
              }}>
              INVOICE
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 18,
                  fontWeight: '400',
                  color: '#999999',
                }}>
                Invoice #501
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 18,
                  fontWeight: '400',
                  color: '#999999',
                }}>
                May, 6 2021
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 18,
                  fontWeight: '400',
                  color: '#999999',
                }}>
                Billed To : Deby Hana
              </Text>
            </View>
          </View>
          <View>
            <Image
              source={require('../assets/images/logo.png')}
              style={{
                borderRadius: 50,
                width: 64,
                height: 64,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: '#595959',
            opacity: 0.3,
            width: '100%',
            marginVertical: 10,
          }}></View>
        {/* header end  */}

        <View>
          {RItem &&
            Object?.keys(RItem)?.map((content, i) => (
              <View key={i}>
                <View
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: '4%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '400',
                      lineHeight: 18,
                      marginVertical: 6,
                      color: '#0A0A09',
                    }}>
                    {content} <Text style={{color: 'red'}}> *</Text>{' '}
                  </Text>
                  {content === 'images' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      {RItem[content]?.map(img => (
                        <Image
                          key={img.id}
                          source={{
                            uri: img?.uri,
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 5,
                            marginVertical: 10,
                          }}
                          resizeMode="cover"
                        />
                      ))}
                    </View>
                  ) : content === 'Site Visit Date' ? (
                    <Text>date</Text>
                  ) : (
                    <Text
                      style={{
                        color: '#BFBFBF',
                        fontSize: 14,
                        lineHeight: 16,
                        fontWeight: '400',
                        marginVertical: 6,
                      }}>
                      {RItem[content]}
                    </Text>
                  )}
                </View>
              </View>
            ))}
        </View>

        {/* exports button */}

        <View
          style={{
            paddingHorizontal: '4%',
            alignItems: 'flex-end',
            marginVertical: 30,
          }}>
          <TouchableOpacity
            onPress={createPDF}
            style={{
              backgroundColor: '#4FB697',
              width: '50%',
              paddingVertical: 20,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                lineHeight: 18,
                fontWeight: '500',
              }}>
              Export As PDF
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({});
