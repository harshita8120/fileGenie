import './Content.css';

export function Content() {
    return (
        <div className="content">
            <p className='ad-text'>
                100% Free & Secure
                <br />
                No Ads, No Cookie Tracking
                <br />
                Hassle-free File Conversion
            </p>

            <hr className="wavy-hr"/>

            <form action="/conversion" method="POST" encType="multipart/form-data">

                <p className='heading'>Select your file type:</p>

                <div className="fileSelection">
                    <label htmlFor="inputFile">From:</label>
                    <select name="inputFile" id="inputFile" defaultValue="default">
                        <option value="default">Select your file format</option>
                        <option value=".jpg">.jpg</option>
                        <option value=".jpeg">.jpeg</option>
                        <option value=".png">.png</option>
                        <option value=".pdf">.pdf</option>
                        <option value=".docx">.docx</option>
                    </select>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="8vw" height="8vw">
                        <path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z">
                        </path>
                    </svg>

                    <label htmlFor="outputFile">To:</label>
                    <select name="outputFile" id="outputFile" defaultValue="default">
                        <option value="default">Select the required file format</option>
                        <option value=".jpg">.jpg</option>
                        <option value=".jpeg">.jpeg</option>
                        <option value=".png">.png</option>
                        <option value=".pdf">.pdf</option>
                        <option value=".docx">.docx</option>
                    </select>
                </div>
                
                <input type="file" id="file-upload" name="file-upload" className='input-box'/>
                <button type="submit" className='convert-btn'>Convert</button>
            </form>


        </div>
    );
}