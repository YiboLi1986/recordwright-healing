const model = require('../../../service/llm/openaiSingleton')
const ChatPromptTemplate = require("langchain/prompts").ChatPromptTemplate
const fs = require('fs')
const path = require('path')
describe('This is a playground', () => {
    it("should work", async () => {
        let systemPrompt = fs.readFileSync(path.join(__dirname, '../../../service/llm/template/systemPrompt.md'), 'utf8')
        let human1 = `
        [Test Step]  
In the row name is john and age is 40 click the name of the wife  

[Method]  

1. The web page section provide outermost scope of a table.  
2. Update outermost table and add one more row with unique value for each column to serve as column header. Do that even if original table has column header.    
3. Set column header for outmost table to be [text#87,text#88,text#89,text#90]. Force this setting even though it may not seems correct.    
4. Now, we need to iterate through each row of the outermost table. For each row, we will create an array to store the identifiers of the individual data cells or the outermost container of sub-components (like a sub-table) within the row. Do not include the identifier of the entire row itself. These identifiers should correspond to the specific outermost row and column header. If a column has a sub-component (like a sub-table), only include the identifier of the outermost container of the sub-component in the array. If a column has a sub-component (like a sub-table), do not include data cells within the sub-component in the array. We repeat this process for all rows in the table, excluding the header row. By the end of this step, we should have an array for each row in the table. Each of these arrays should contain the identifiers of the data cells or outermost container, in the order of the column headers.  

[Output]  
Output result in JSON format. Following is a template. Output JSON only. No reasoning.    
{{  
OuterTableCell:string[][],    
}}    
  
"OuterTableCell" represents outer-most table in array of array format. The outer array represents array of rows. The inner array represents array data cell container in the row. The data cell container follows "tag#id" strictly. For example: div#5.  

[Web Page]  
DIV#17(class="table-body",automationid="9")
 DIV#19(class="row bg-primary",automationid="10")
  text#59 John
  text#60 25
  text#61 john@example.com
  DIV#62(class="sub-table",automationid="15")
   DIV#91(class="row",automationid="16")
    text#133 Daughter
    text#134 Emily
   DIV#92(class="row",automationid="19")
    text#135 Wife
    text#136 Lindsy
 DIV#20(class="row bg-secondary",automationid="22")
  text#63 Jane
  text#64 30
  text#65 jane@example.com
  DIV#66(class="sub-table",automationid="27")
   DIV#93(class="row",automationid="28")
    text#137 Son
    text#138 Jack
   DIV#94(class="row",automationid="31")
    text#139 Husband
    text#140 Sam
 DIV#21(class="row bg-primary",automationid="34")
  text#67 John
  text#68 40
  text#69 samuel@example.com
  DIV#70(class="sub-table",automationid="39")
   DIV#95(class="row",automationid="40")
    text#141 Brother
    text#142 Michael
   DIV#96(class="row",automationid="43")
    text#143 Wife
    text#144 Anna
 DIV#22(class="row bg-secondary",automationid="46")
  text#71 Lisa
  text#72 28
  text#73 lisa@example.com
  DIV#74(class="sub-table",automationid="51")
   DIV#97(class="row",automationid="52")
    text#145 Sister
    text#146 Sarah
   DIV#98(class="row",automationid="55")
    text#147 Mother
    text#148 Maggie
 DIV#23(class="row bg-primary",automationid="58")
  text#75 Daniel
  text#76 35
  text#77 daniel@example.com
  DIV#78(class="sub-table",automationid="63")
   DIV#99(class="row",automationid="64")
    text#149 Father
    text#150 John Sr.
   DIV#100(class="row",automationid="67")
    text#151 Daughter
    text#152 Danielle
 DIV#24(class="row bg-secondary",automationid="70")
  text#79 Maggie
  text#80 60
  text#81 maggie@example.com
  DIV#82(class="sub-table",automationid="75")
   DIV#101(class="row",automationid="76")
    text#153 Daughter
    text#154 Lisa
   DIV#102(class="row",automationid="79")
    text#155 Son
    text#156 Chris
 DIV#25(class="row bg-primary",automationid="82")
  text#83 Chris
  text#84 32
  text#85 chris@example.com
  DIV#86(class="sub-table",automationid="87")
   DIV#103(class="row",automationid="88")
    text#157 Mother
    text#158 Maggie
   DIV#104(class="row",automationid="91")
    text#159 Brother
    text#160 Luke
DIV#26(class="row",automationid="4")
 text#87 Name
 text#88 Age
 text#89 Email
 text#90 Family Member
        `
        let ai1 = `
        Based on the provided information, the following steps are taken:

        1. The outermost scope of the table is identified as DIV#17.
        2. The table is updated to include a new row with unique values for each column to serve as the column header. The column headers are set to be [text#87,text#88,text#89,text#90].
        3. The table is iterated through each row. For each row, an array is created to store the identifiers of the individual data cells or the outermost container of sub-components within the row. These identifiers correspond to the specific outermost row and column header. If a column has a sub-component, only the identifier of the outermost container of the sub-component is included in the array. This process is repeated for all rows in the table, excluding the header row.
        
        The output JSON is as follows:
        
        {{
        "OuterTableCell": [
        ["div#19", "text#59", "text#60", "text#61", "div#62"],
        ["div#20", "text#63", "text#64", "text#65", "div#66"],
        ["div#21", "text#67", "text#68", "text#69", "div#70"],
        ["div#22", "text#71", "text#72", "text#73", "div#74"],
        ["div#23", "text#75", "text#76", "text#77", "div#78"],
        ["div#24", "text#79", "text#80", "text#81", "div#82"],
        ["div#25", "text#83", "text#84", "text#85", "div#86"]
        ]
        }}

        `

        const chatPrompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", human1],
            ['ai', ai1],
            ["human", `Explain the reason why you think think the first element of OUterTable includes div#19 based on the method`],
            // ['ai', `I apologize for the confusion. You're correct. Based on the method, the first element of OuterTableCell should be ["text#59","text#60","text#61","DIV#62"]. 

            // The reason is that the method instructs us to create an array for each row that contains the identifiers of the individual data cells or the outermost container of sub-components within the row. These identifiers should correspond to the specific outermost row and column header. 

            // In the case of the first row, the identifiers for the data cells are "text#59", "text#60", and "text#61". The identifier for the outermost container of the sub-component (the sub-table) is "DIV#62". 

            // The identifier "div#19" represents the entire row, not the individual data cells or the outermost container of the sub-components within the row. Therefore, it should not be included in the array for the first row.`],
            // ['human', "which instruction cause your previous mistake? Improve the instruction so that you won't make similar mistake again"]
        ]);
        const chain = chatPrompt.pipe(model);
        const result = await chain.invoke()
        console.log(result.content)
    }).timeout(9999999)
})